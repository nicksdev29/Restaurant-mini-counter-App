import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBALS } from '../../common/global-constant.constants';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSession: any = null;

  constructor( private router: Router, private httpClient: HttpClient ) { }

  setSession(session: any) {
    this.userSession = {
      token: session.data,
      sessionPayload: this.getJwtPayload(session.data)
    };
    GLOBALS.userSession = this.userSession;
    localStorage.setItem(GLOBALS.sessionKey, JSON.stringify( this.userSession ));
  }

  isLoggedIn() {
    if(!GLOBALS.userSession) {
      if( this.getJwtToken() ) {
        let sessionPayload: any = this.getJwtPayload( this.getJwtToken() );
        if(sessionPayload.exp > moment().unix()) {
          this.userSession = {
            token: this.getJwtToken(),
            sessionPayload: this.getJwtPayload( this.getJwtToken() )
          };
          GLOBALS.userSession = this.userSession;
          return true;
        }
      }
      return false
    } else if(GLOBALS.userSession.sessionPayload.exp > moment().unix()) {
      return true;
    }
    return false;
  }

  getJwtToken() {
    if( localStorage.getItem(GLOBALS.sessionKey) ) {
      let session: any = JSON.parse( String( localStorage.getItem(GLOBALS.sessionKey) ) );
      return session.token;
    }
    return null;
  }

  getJwtPayload(jwtToken: string) {
    return jwtDecode(jwtToken);
  }

  deregisterUserSession() {
    this.userSession = null;
    localStorage.removeItem(GLOBALS.sessionKey);
    GLOBALS.userSession = null;
    this.router.navigateByUrl('auth/login');
  }

  routeToUserDefaultRouteAfterLoginOrValidate() {
    this.router.navigateByUrl(GLOBALS.userSession?.sessionPayload?.route);
  }

  hasRoleAccess(roleToCheck: string): boolean {
    debugger;
    console.log('user role: ', GLOBALS.userSession?.sessionPayload?.role);
    console.log('route role to check: ', roleToCheck);
    if(GLOBALS.userSession?.sessionPayload?.role.toLowerCase() === roleToCheck) {
      return true;
    }
    return false;
  }
}
