import { Injectable, inject } from '@angular/core';
import * as AuthActions from './auth.actions';
import {
  EMPTY,
  Observable,
  catchError,
  from,
  map,
  mapTo,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthSelectors from './auth.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { NotificationType } from '../../model/mz.enums';
import { MessageService } from 'primeng/api';
import { EmailAddress, EmailAddressDTO } from '../../model/todoDto.interface';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);

  constructor(
    private store: Store,
    private service: AuthService,
    private router: Router,
    private firebaseAuth: Auth,
    private messageService: MessageService
  ) {}
  // private loadingService: LoadingService

  postRegisterUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.postRegister),
      // tap(() => this.loadingService.loadingOn()),
      withLatestFrom(this.store.select(AuthSelectors.selectRegisterFormState)),
      mergeMap(([_, data]) =>
        this.service.register(data).pipe(
          map(() => {
            this.messageService.add({
              severity: NotificationType.Success,
              summary: 'Success',
              detail: 'User register succeeded',
            });
            return AuthActions.postEmail({
              id: 0,
              email: data.email,
              username: data.username,
            });
          }),
          catchError((error) => {
            return of(AuthActions.authError({ error: error.message }));
          })
        )
      )
    )
  );

  postEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.postEmail),
      mergeMap((data: EmailAddressDTO) =>
        this.service
          .postEmail({
            id: data.id,
            email: data.email,
            displayName: data.username,
          })
          .pipe(
            map(() => {
              return AuthActions.postEmailSuccess();
            }),
            catchError((error) => {
              return of(AuthActions.authError({ error: error }));
            })
          )
      )
    )
  );

  postLoginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.postLogin),
      withLatestFrom(this.store.select(AuthSelectors.selectLoginState)),
      mergeMap(([_, data]) =>
        this.service.login(data).pipe(
          map(() => {
            this.messageService.add({
              severity: NotificationType.Success,
              summary: 'Success',
              detail: 'User login succeeded',
            });
            return AuthActions.postLoginSuccess({ _data: data });
          }),
          catchError((error) => {
            return of(AuthActions.authError({ error: error.message }));
          })
        )
      )
    )
  );

  autoLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        switchMap(() =>
          this.service.user$.pipe(
            take(1),
            map((user: any) => {
              if (user) {
                this.service.currentUser$ig.set({
                  email: user.email!,
                  username: user.displayName!,
                  accessToken: user.accessToken!,
                });
              } else {
                this.service.currentUser$ig.set(null);
              }
            })
          )
        )
      ),
    { dispatch: false }
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      switchMap(() => {
        const signOutPromise = signOut(this.firebaseAuth);
        return from(signOutPromise).pipe(
          switchMap(() => {
            this.messageService.add({
              severity: NotificationType.Success,
              summary: 'Success',
              detail: 'Logout has been succeeded',
            });
            return of(AuthActions.logoutUserSuccess());
          }),
          catchError((error) => {
            return of(AuthActions.authError({ error: error.message }));
          })
        );
      })
    )
  );

  // loadingOff$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logoutUserSuccess, AuthActions.loginUserSuccess, AuthActions.registerUserSuccess),
  //     mergeMap(() => {
  //       this.loadingService.loadingOff();
  //       return of(AuthActions.loadingOff());
  //     })
  //   )
  // );

  redirectTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.postLoginSuccess,
          AuthActions.postEmailSuccess,
          AuthActions.redirectToRegister,
          AuthActions.redirectToLogin,
          AuthActions.logoutUserSuccess
        ),
        tap((action) => {
          if (action.type === AuthActions.redirectToRegister.type) {
            this.router.navigate(['register']);
          } else if (
            action.type === AuthActions.redirectToLogin.type ||
            action.type === AuthActions.logoutUserSuccess.type
          ) {
            this.router.navigate(['login']);
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  errorHandling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authError),
      mergeMap((errorMessage) => {
        this.messageService.add({
          severity: NotificationType.Error,
          summary: errorMessage.type,
          detail: errorMessage.error ?? 'Something wrong',
        });
        return of(AuthActions.authErrorHandling());
      })
    )
  );
}
