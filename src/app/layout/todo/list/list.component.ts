import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { SubscriptionManager } from '../../../utils/subscriptionManager';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TodoItems } from '../../../model/todoDto.interface';
import { EnumMapperPipe } from '../../../shared/pipe/enumMapper.pipe';
import { Priority, Stage } from '../../../model/mz.enums';
import { PriorityColorDirective } from '../../../shared/directive/priorityColor.directive';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/dialog/confirmation/confirm-dialog.component';
import * as TodoActions from '../+state/todo.actions';
import * as TodoSelectors from '../+state/todo.selectors';
import { todoListDisplayColumn } from '../../../utils/todoListDisplayColumns';
@Component({
  selector: 'zm-todo-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    EnumMapperPipe,
    PriorityColorDirective,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SubscriptionManager {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  StageType = Stage;
  PriorityType = Priority;

  confirmDialogRef = signal<MatDialogRef<ConfirmDialogComponent> | null>(null);

  displayedColumns: string[] = todoListDisplayColumn;

  dataSource$: Observable<TodoItems[]> = this.store.select(
    TodoSelectors.selectTodoList
  );

  constructor(private store: Store, private dialog: MatDialog) {
    super();
  }

  deleteTodo(id: string): void {
    this.store.dispatch(TodoActions.deleteTodoConfirmation({ id }));
  }

  modifyTodo = (id: number): void =>
    this.store.dispatch(TodoActions.getUpdateTodo({ id }));

  //TODO
  onPageChange(asd: any) {}
}
