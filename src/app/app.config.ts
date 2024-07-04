import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  AUTH_FORM_FEATURE_KEY,
  authFormReducer,
} from './auth/+state/auth.reducer';
import { AuthEffects } from './auth/+state/auth.effects';
import { MessageService } from 'primeng/api';
import { TodoEffects } from './layout/todo/+state/todo.effects';
import {
  TODO_FEATURE_KEY,
  todoListReducer,
} from './layout/todo/+state/todo.reducer';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_CONFIG } from '../../configs';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideStore(),
    provideState({ name: AUTH_FORM_FEATURE_KEY, reducer: authFormReducer }),
    provideState({ name: TODO_FEATURE_KEY, reducer: todoListReducer }),
    provideStoreDevtools(),
    provideEffects([AuthEffects, TodoEffects]),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    MessageService,
    provideNativeDateAdapter(),
  ],
};
