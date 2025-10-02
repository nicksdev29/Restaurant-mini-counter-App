import { Injectable, NgModule, provideZoneChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { ReusableComponentsModule } from './reusable-components/reusable-components.module';
import { TablesModule } from './tables/tables.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule, platformBrowser, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { responseInterceptor } from './interceptors/response/response.interceptor';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
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
    ReusableComponentsModule,
    TablesModule
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }

platformBrowser().bootstrapModule(AppModule);