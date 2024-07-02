import { Injectable, inject } from '@angular/core';
import * as TodoActions from './todo.actions';
import * as TodoSelectors from './todo.selectors';
import {
  EMPTY,
  catchError,
  delay,
  exhaustMap,
  finalize,
  from,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Comments, TodoDTO } from '../../../model/todoDto.interface';
import { TodoService } from '../todo.service';
import { TodoFormState } from './todo.reducer';
import { Auth } from 'firebase/auth';
import { AuthService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';
import { NotificationType } from '../../../model/mz.enums';
import { MessageService } from 'primeng/api';
import { StepperService } from '../../../utils/stepper.service';

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions);

  constructor(
    private authService: AuthService,
    private service: TodoService,
    private dialog: MatDialog,
    private store: Store,
    private messageService: MessageService,
    private stepperService: StepperService
  ) {}

  updateForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodoForm),
      withLatestFrom(this.store.select(TodoSelectors.selectPostTodoForm)),
      mergeMap(([_, data]) => {
        return this.service.updateTodo(data).pipe(
          map(() => {
            return TodoActions.updateTodoFormSuccess();
          }),
          catchError((error) => {
            return of(TodoActions.todoError({ error: error }));
          })
        );
      })
    )
  );

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.postTodoForm),
      withLatestFrom(this.store.select(TodoSelectors.selectPostTodoForm)),
      mergeMap(([_, data]) => {
        const currentUser = this.authService.currentUser$ig();
        const modifiedData = {
          ...data,
          id: 0,
          completed: false,
          createdAt: new Date(),
          createdBy: currentUser!.email,
        };

        return this.service.postTodo(modifiedData).pipe(
          map(() => {
            return TodoActions.postTodoFormSuccess();
          }),
          catchError((error) => {
            return of(TodoActions.todoError({ error: error }));
          })
        );
      })
    )
  );

  commentForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoCommentPost),
      mergeMap((data) => {
        const currentUser = this.authService.currentUser$ig();
        const modifiedData: Comments = {
          id: 0, //TODO remove later
          text: data.value,
          todoId: 0, //TODO handle an other way
          createdAt: new Date(),
          createdBy: currentUser!.email,
        };
        return of(
          TodoActions.todoCommentReducerModify({
            modifiedComment: modifiedData,
          })
        );
      })
    )
  );

  stepper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.nextTodoComponent, TodoActions.previousTodoComponent),
      switchMap((data) => {
        if (data.type === TodoActions.nextTodoComponent.type) {
          return this.stepperService.nextStep().pipe(
            map(() => TodoActions.nextTodoComponentSuccess()),
            catchError((error) => of(TodoActions.todoError({ error })))
          );
        } else if (data.type === TodoActions.previousTodoComponent.type) {
          return this.stepperService.previousStep().pipe(
            map(() => TodoActions.previousTodoComponentSuccess()),
            catchError((error) => of(TodoActions.todoError({ error })))
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  getTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodoList),
      mergeMap((data) =>
        from(this.authService.getToken()).pipe(
          mergeMap((token) =>
            this.service
              .getTodoList(
                data.pageNumber,
                data.pageSize,
                data.sortBy,
                data.isDescending
              )
              .pipe(
                map((data: TodoFormState) => {
                  return TodoActions.loadTodoList({ data, token: token ?? '' });
                }),
                finalize(() => {
                  // this.loadingService.loadingOff();
                }),

                catchError((error) => {
                  return of(TodoActions.todoError({ error: error.message }));
                })
              )
          )
        )
      )
    )
  );

  openDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.isCreate),
      switchMap((data) => {
        let dialogRef;

        if (data.isCreate) {
          dialogRef = this.dialog.open(CreateComponent, {
            width: '80rem',
            height: '32rem',
            panelClass: 'dialog-container',
            disableClose: true,
          });
        } else {
          dialogRef = this.dialog.open(EditComponent, {
            width: '80rem',
            height: '32rem',
            panelClass: 'dialog-container',
            disableClose: true,
          });
        }

        return dialogRef.afterClosed().pipe(
          map(() => {
            return TodoActions.openDialog();
          })
        );
      })
    )
  );

  deleteTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        mergeMap((data) =>
          this.service.deleteTodo(data?.id).pipe(
            map(() => {
              return TodoActions.deleteTodoSuccess();
            }),
            catchError((error) => {
              return of(TodoActions.todoError({ error: error }));
            })
          )
        )
      ),
    { dispatch: false }
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteComment),
      mergeMap((data) =>
        this.service.deleteComment(data.id, data.commentId).pipe(
          map(() => {
            return TodoActions.deleteCommentSuccess({
              commentId: data.commentId,
            });
          }),
          catchError((error) => {
            return of(TodoActions.todoError({ error: error }));
          })
        )
      )
    )
  );

  getUpdateTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getUpdateTodo),
      switchMap((action) =>
        this.service.getTodoById(action.id).pipe(
          switchMap((response) => [
            TodoActions.setCurrentTodo({ data: response }),
            TodoActions.isCreate({ isCreate: false }),
          ]),
          catchError((error) => of(TodoActions.todoError({ error })))
        )
      )
    )
  );

  reloadTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TodoActions.postTodoFormSuccess,
        TodoActions.deleteTodoSuccess,
        TodoActions.updateTodoForm,
        TodoActions.deleteCommentSuccess
      ),
      mergeMap(() => {
        return of(TodoActions.getTodoList());
      })
    )
  );

  errorHandling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.todoError),
      mergeMap((errorMessage) => {
        this.messageService.add({
          severity: NotificationType.Error,
          summary: errorMessage.type,
          detail: errorMessage.error ?? 'Something wrong',
        });
        return of(TodoActions.todoErrorHandling());
      })
    )
  );
}
