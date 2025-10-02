import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { GLOBALS } from '../../common/global-constant.constants';
import { environment } from '../../../environments/environment';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private router: Router, private httpClient: HttpClient, private commonService: CommonService) { }
  
    login(userPayload: any): Observable<any> {
      return this.httpClient.post( environment.baseUrl + GLOBALS.cruds.post, userPayload, {params: {'endPoint': GLOBALS.users.login}, observe: 'response'}).pipe(
        map(
          (response: any) => {
           return this.commonService.handleResponse(response);
          }
        )
      );
    }
  
    registerCustomer(userPayload: any): Observable<any> {
      return new Observable<any>( (res) => {
        this.httpClient.post( environment.baseUrl + GLOBALS.cruds.post, userPayload, {params: {'endPoint': GLOBALS.users.addNewCustomer}, observe: 'response'}).subscribe( (httpRes) => {
          res.next(httpRes);
        });
      });
    }

}
