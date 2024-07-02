import { createAction, props } from '@ngrx/store';

export const authError = createAction(
  '[Auth] Error',
  props<{ error: string }>()
);
export const authErrorHandling = createAction('[Auth] Error handling');
export const postLogin = createAction('[Auth] Post Login User');
export const postLoginSuccess = createAction(
  '[Auth] Post Login User Succedeed',
  props<{ _data: any }>()
);
export const updateLoginUser = createAction(
  '[Auth] Update Login User',
  props<{ value: any }>()
);
export const updateLoginUserSuccess = createAction(
  '[Auth] Update Login User Success'
);
export const updateRegisterUser = createAction(
  '[Auth] Update Register User',
  props<{ value: any }>()
);
export const updateRegisterUserSuccess = createAction(
  '[Auth] Update Register User Success'
);

export const loadingOn = createAction('[Auth] Loading On');

export const loadingOff = createAction('[Auth] Loading Off');

export const logoutUser = createAction('[Auth] Logout User');

export const logoutUserSuccess = createAction('[Auth] Logout User Success');

export const postRegister = createAction('[Auth] Post Register User');
export const postEmail = createAction(
  '[Auth] Post Email User',
  props<{ id: number; email: string; username: string }>()
);

export const postEmailSuccess = createAction(
  '[Auth] Post Email User Succedeed'
);
export const redirectToRegister = createAction('[Auth] Redirect to Register');
export const redirectToLogin = createAction('[Auth] Redirect to Login');
export const redirectToHome = createAction('[Auth] Redirect to Home');

export const autoLogin = createAction('[Auth] Auto Login');
export const setBearerToken = createAction('[Auth] Set Bearer Token');
export const setBearerTokenSuccess = createAction(
  '[Auth] Set Bearer Token Success',
  props<{ token: string }>()
);
