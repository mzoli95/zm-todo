import { Injectable, inject, signal } from '@angular/core';
import { Observable, from } from 'rxjs';

import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  LoginFormState,
  RegisterFormState,
  UserInterface,
} from './+state/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUser$ig = signal<UserInterface | null | undefined>(undefined);

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

  login(userData: LoginFormState): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      userData.email,
      userData.password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
