import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import {
  AUTH_FORM_FEATURE_KEY,
  authFormReducer,
} from './auth/+state/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/+state/auth.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyABZFFp_mQ_Urzs_YO3ZIicFwdTyUoRcTY',
  authDomain: 'zm-todo.firebaseapp.com',
  projectId: 'zm-todo',
  storageBucket: 'zm-todo.appspot.com',
  messagingSenderId: '143552123134',
  appId: '1:143552123134:web:2425f5704b669bb89555af',
  measurementId: 'G-QTE3DG2H5P',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: AUTH_FORM_FEATURE_KEY, reducer: authFormReducer }),
    provideStoreDevtools(),
    provideEffects([AuthEffects]),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
