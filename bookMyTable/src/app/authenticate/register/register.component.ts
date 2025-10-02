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
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  customerFormGroup: FormGroup = new FormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    mobile: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor ( private authService: AuthService, private router: Router, private usersService: UsersService) {}

  addNewCustomer() {
    if(this.customerFormGroup.valid) {
      this.usersService.registerCustomer(this.customerFormGroup.value).subscribe( (res) => {
        this.router.navigateByUrl('login');
      });
    }
  }

}
