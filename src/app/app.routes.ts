import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('@features/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/tabs/tabs.routes').then((m) => m.routes),
  },
];
