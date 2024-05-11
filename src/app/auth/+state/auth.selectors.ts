import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FORM_FEATURE_KEY } from './auth.reducer';
import { AuthFormState } from './user.interface';

export const selectAuthFeature = createFeatureSelector<AuthFormState>(
  AUTH_FORM_FEATURE_KEY
);

export const selectLoginState = createSelector(
  selectAuthFeature,
  (state: AuthFormState) => {
    console.log(state);
    return state.auth.loginForm;
  }
);

export const selectRegisterFormState = createSelector(
  selectAuthFeature,
  (state: AuthFormState) => state.auth.registerForm
);
