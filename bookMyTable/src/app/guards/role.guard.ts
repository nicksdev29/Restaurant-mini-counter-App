import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let roleData: any = route.data;
  debugger;
  if(authService.hasRoleAccess(roleData?.accessRole)) {
    debugger;
    return true;
  } else if ( !authService.hasRoleAccess(roleData?.accessRole) && authService.isLoggedIn() ) {
    debugger;
    authService.routeToUserDefaultRouteAfterLoginOrValidate();
    return true;
  }
  return false;
};

