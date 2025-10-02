


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { TablesComponent } from './tables.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TablesRoutingModule } from './tables-routing.module';




@NgModule({
  declarations: [TablesComponent],
  imports: [
    TablesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    ReusableComponentsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class TablesModule {
}

