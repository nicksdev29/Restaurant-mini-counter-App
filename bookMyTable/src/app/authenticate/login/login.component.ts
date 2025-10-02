import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
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
import { ReusableComponentsModule } from '../../reusable-components/reusable-components.module';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userName: string = '';
  password: string = '';
  loginFormGroup: FormGroup = new FormGroup({
    user: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required])
  })

  constructor ( private authService: AuthService, private router: Router, private usersService: UsersService) {}

  doLogin() {
    if(this.loginFormGroup.valid) {
      this.usersService.login(this.loginFormGroup.value).subscribe( (res: any) => {
        this.authService.setSession(res);
        this.authService.routeToUserDefaultRouteAfterLoginOrValidate();
      });
    }
  }

  registerCustomer() {
    this.router.navigateByUrl('auth/register');
  }

}
