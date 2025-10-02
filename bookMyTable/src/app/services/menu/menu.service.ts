import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GLOBALS } from '../../common/global-constant.constants';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  getAllMenuItems(): Observable<any> {
    return this.httpClient.get( environment.baseUrl + GLOBALS.cruds.get, {params: {'endPoint': GLOBALS.menu.getAll}, observe: 'response'}).pipe(
      map(
        (response: any) => {
          return this.commonService.handleResponse(response);
        }
      )
    );
  }

}
