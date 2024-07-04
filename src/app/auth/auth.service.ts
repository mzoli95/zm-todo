import { Injectable, signal } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';

import {
  Auth,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  LoginFormState,
  RegisterFormState,
  UserInterface,
} from '../model/user.interface';
import * as AuthActions from './+state/auth.actions';
import { Store } from '@ngrx/store';
import { EmailAddress } from '../model/todoDto.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firebaseAuth: Auth,
    private store: Store,
    private http: HttpClient
  ) {}

  user$ = user(this.firebaseAuth);
  currentUser$ig = signal<UserInterface | null | undefined>(undefined);

  url = environment.apiUrl;

  register(userData: RegisterFormState): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      userData.email,
      userData.password
    ).then((response) =>
      updateProfile(response.user, { displayName: userData.username })
    );
    return from(promise);
  }

  postEmail(data: EmailAddress) {
    return this.http.post(`${this.url}/todo/email`, data).pipe(
      catchError((error) => {
        return throwError(
          () => new Error(error.message || 'Valami hiba történt')
        );
      })
    );
  }

  login(userData: LoginFormState): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      userData.email,
      userData.password
    ).then(() => {});
    return from(promise);
  }

  getToken(): Promise<string | null> {
    return (
      this.firebaseAuth.currentUser?.getIdToken(true) || Promise.resolve(null)
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logoutUser());
  }
}
