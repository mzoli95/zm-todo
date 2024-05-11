import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'zm-root',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUser$ig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUser$ig.set(null);
      }
    });
  }
}
