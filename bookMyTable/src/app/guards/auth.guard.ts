import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject( AuthService );
  let router = inject( Router );
  if(authService.isLoggedIn()) {
    return true;
  } else {
    authService.deregisterUserSession();
    router.navigateByUrl('auth/login');
  }
  return false;
};

export const authGuardChild: CanActivateChildFn = (route, state) => {
  let authService = inject( AuthService );
  let router = inject( Router );
  if(authService.isLoggedIn()) {
    debugger;
    return true;
  } else {
    debugger;
    authService.deregisterUserSession();
    router.navigateByUrl('auth/login');
  }
  return false;
};