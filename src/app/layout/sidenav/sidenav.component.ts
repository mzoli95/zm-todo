import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../../auth/login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/+state/auth.actions';

@Component({
  selector: 'zm-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    LoginComponent,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  authService = inject(AuthService);

  constructor(private store: Store) {}

  navigateToRegister(): void {
    this.store.dispatch(AuthActions.redirectToRegister());
  }

  navigateToLogin(): void {
    this.store.dispatch(AuthActions.redirectToLogin());
  }

  logout(): void {
    this.authService.logout();
  }
}
