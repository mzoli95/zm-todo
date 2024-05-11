import { Injectable, inject } from '@angular/core';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthSelectors from './auth.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  service = inject(AuthService);
  router = inject(Router);
  // private loadingService: LoadingService

  postRegisterUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.postRegister),
        // tap(()=> this.loadingService.loadingOn()    ),
        withLatestFrom(
          this.store.select(AuthSelectors.selectRegisterFormState)
        ),
        mergeMap(([_, data]) =>
          this.service.register(data).pipe(
            map((data) => {
              return AuthActions.postRegisterSuccess({ _data: data });
            }),
            catchError((error) => {
              return of(AuthActions.authError({ error: error }));
            })
          )
        )
      ),
    { dispatch: false }
  );
  postLoginUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.postLogin),
        withLatestFrom(this.store.select(AuthSelectors.selectLoginState)),
        mergeMap(([_, data]) =>
          this.service.login(data).pipe(
            map((data) => {
              return AuthActions.postLoginSuccess({ _data: data });
            }),
            catchError((error) => {
              return of(AuthActions.authError({ error: error }));
            })
          )
        )
      ),
    { dispatch: false }
  );

  // logoutUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logoutUser),
  //     tap(()=> this.loadingService.loadingOn()    ),

  //     mergeMap(() => {
  //       this.service.logout();
  //       return of(AuthActions.logoutUserSuccess());
  //     }),
  //     tap(() => {
  //       this.store.dispatch(MzbhPortfolioActions.redirectToUpdates());
  //     }),
  //     catchError((error) => {
  //       return of(AuthActions.logoutUserError({ error: error }));
  //     })
  //   )
  // );

  // loadingOff$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logoutUserSuccess, AuthActions.loginUserSuccess, AuthActions.registerUserSuccess),
  //     mergeMap(() => {
  //       this.loadingService.loadingOff();
  //       return of(AuthActions.loadingOff());
  //     })
  //   )
  // );

  redirectToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.postLoginSuccess, AuthActions.postRegisterSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  // redirectToUpdates$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(MzbhPortfolioActions.redirectToUpdates),
  //       tap(() => this.router.navigate(['/updates']))
  //     ),
  //   { dispatch: false }
  // );

  // redirectToLogin$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(MzbhPortfolioActions.redirectToLogin),
  //       tap(() => this.router.navigate(['/login']))
  //     ),
  //   { dispatch: false }
  // );
}
