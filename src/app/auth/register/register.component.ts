import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionManager } from '../../utils/subscriptionManager';
import { HttpClient } from '@angular/common/http';
import { RegisterFormState } from '../+state/user.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as AuthActions from '../+state/auth.actions';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
type RegisterForm = Record<keyof RegisterFormState, FormControl>;

@Component({
  selector: 'zm-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends SubscriptionManager {
  store = inject(Store);

  registerFormControls: RegisterForm = {
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  };
  form = new FormGroup(this.registerFormControls);
  hide = true;

  ngOnInit() {
    this.addSubscriptions(
      this.form.valueChanges.subscribe((data) => {
        this.store.dispatch(AuthActions.updateRegisterUser({ value: data }));
      })
    );
  }

  registerUser() {
    this.store.dispatch(AuthActions.postRegister());
  }
}
