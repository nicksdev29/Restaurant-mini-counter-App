import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authGuardChild } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tables/tables.module').then( module => module.TablesModule),
    canActivateChild: [authGuardChild]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authenticate/authenticate.module').then( module => module.AuthenticateModule )
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( module => module.AdminModule ),
    canActivateChild: [authGuardChild]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
