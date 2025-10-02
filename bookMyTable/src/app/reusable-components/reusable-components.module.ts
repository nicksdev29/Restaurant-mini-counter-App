import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberCounterComponent } from './components/number-counter/number-counter.component';
import { OrdersComponent } from './components/orders/orders.component';



@NgModule({
  declarations: [NumberCounterComponent, OrdersComponent],
  exports: [NumberCounterComponent, OrdersComponent],
  imports: [
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
      MatIconModule
  ]
})
export class ReusableComponentsModule { }
