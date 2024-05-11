import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../../auth/login/login.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

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
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  authService = inject(AuthService);
  isOpen: boolean = false;

  logout(): void {
    this.authService.logout();
  }
}
