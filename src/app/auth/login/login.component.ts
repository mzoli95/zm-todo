import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../+state/auth.actions';

import { SubscriptionManager } from '../../utils/subscriptionManager';
import { HttpClient } from '@angular/common/http';
import { LoginFormState } from '../../model/user.interface';
type LoginForm = Record<keyof LoginFormState, FormControl>;

@Component({
  selector: 'zm-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends SubscriptionManager {
  store = inject(Store);
  http = inject(HttpClient);

  loginFormControls: LoginForm = {
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  };
  form = new FormGroup(this.loginFormControls);
  hide = true;

  ngOnInit() {
    this.addSubscriptions(
      this.form.valueChanges.subscribe((data) => {
        this.store.dispatch(AuthActions.updateLoginUser({ value: data }));
      })
    );
  }

  loginUser() {
    this.store.dispatch(AuthActions.postLogin());
  }

  redirectToRegister() {
    this.store.dispatch(AuthActions.redirectToRegister());
  }
}
