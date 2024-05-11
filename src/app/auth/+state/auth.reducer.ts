import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthFormState } from './user.interface';

export const AUTH_FORM_FEATURE_KEY = 'auth';

export const authFormInitialState: AuthFormState = {
  auth: {
    loginForm: {
      email: '',
      password: '',
    },
    registerForm: {
      username: '',
      email: '',
      password: '',
    },
    isLoggedIn: false,
    user: {
      displayName: '',
      email: '',
      expiresIn: '',
      idToken: '',
      kind: '',
      localId: '',
      refreshToken: '',
      registered: false,
    },
  },
};

export const authFormReducer = createReducer(
  authFormInitialState,
  on(AuthActions.updateRegisterUser, (state, { value }) => ({
    ...state,
    auth: {
      ...state.auth,
      registerForm: value,
    },
  })),
  on(AuthActions.updateLoginUser, (state, { value }) => ({
    ...state,
    auth: {
      ...state.auth,
      loginForm: value,
    },
  }))

  // on(AuthActions.postLoginSuccess, (state, { _data }) => {
  //   return {
  //     ...state,
  //     ...authFormInitialState,
  //     auth: {
  //       user: _data,
  //       isLoggedIn: true,
  //     },
  //   };
  // })
);
