import { createAction, props } from '@ngrx/store';
import { LoginFormState, User } from './user.interface';

export const authError = createAction('[Auth] Error', props<{ error: any }>());
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

//

export const loadingOn = createAction('[Auth] Loading On');

export const loadingOff = createAction('[Auth] Loading Off');

export const logoutUser = createAction('[Auth] Logout User');

export const logoutUserSuccess = createAction('[Auth] Logout User Success');

export const postRegister = createAction('[Auth] Post Register User');
export const postRegisterSuccess = createAction(
  '[Auth] Post Register User Succedeed',
  props<{ _data: any }>()
);
