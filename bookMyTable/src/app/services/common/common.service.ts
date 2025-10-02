import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handleResponse(res: any) {
    if(res.status === 200 || res.status === 201) {
      res = res.body;
    }
    return res;
  }
}
