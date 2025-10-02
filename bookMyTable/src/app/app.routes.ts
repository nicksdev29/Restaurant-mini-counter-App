import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tables/tables.component').then( module => module.TablesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./authenticate/login/login.component').then( module => module.LoginComponent )
  },
  {
    path: 'register',
    loadComponent: () => import('./authenticate/register/register.component').then( module => module.RegisterComponent )
  }
];
