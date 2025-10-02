import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';

export const tableRoutes: Routes = [
  {
    path: '',
    component: TablesComponent,
    canActivate: [roleGuard],
    data: {accessRole: 'customer'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(tableRoutes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
