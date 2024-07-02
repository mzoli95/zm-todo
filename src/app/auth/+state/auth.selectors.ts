import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FORM_FEATURE_KEY } from './auth.reducer';
import { AuthFormState } from '../../model/user.interface';

export const selectAuthFeature = createFeatureSelector<AuthFormState>(
  AUTH_FORM_FEATURE_KEY
);

export const selectLoginState = createSelector(
  selectAuthFeature,
  (state: AuthFormState) => {
    return state.auth.loginForm;
  }
);

export const selectRegisterFormState = createSelector(
  selectAuthFeature,
  (state: AuthFormState) => state.auth.registerForm
);

export const selectBearerToken = createSelector(
  selectAuthFeature,
  (state: AuthFormState) => state.auth.user.idToken ?? null
);
