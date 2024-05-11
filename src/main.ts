import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/auth/+state/auth.effects';
import {
  AUTH_FORM_FEATURE_KEY,
  authFormReducer,
} from './app/auth/+state/auth.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environment/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideStore(),
//     provideState({ name: AUTH_FORM_FEATURE_KEY, reducer: authFormReducer }),
//     provideStoreDevtools(),
//     provideEffects([AuthEffects]),
//     provideAnimations(),
//   ],
// });

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
