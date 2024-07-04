import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const TODO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./todo.component').then((mod) => mod.TodoComponent),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
