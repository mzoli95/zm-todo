import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { Store } from '@ngrx/store';
import { LoadingComponent } from './shared/animation/loading/loading.component';
import { NotificationComponent } from './shared/notification/notification.component';
import * as AuthActions from '../app/auth/+state/auth.actions';

@Component({
  selector: 'zm-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavComponent,
    RouterOutlet,
    NotificationComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
