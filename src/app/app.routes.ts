import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./layout/todo/todo.routes').then((mod) => mod.TODO_ROUTES),
  },
  { path: '**', redirectTo: 'todo' },
];
