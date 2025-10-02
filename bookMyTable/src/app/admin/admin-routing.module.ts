import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { roleGuard } from '../guards/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: {accessRole: 'admin'},
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'audit',
        component: AuditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
