import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe( tap( (res: any) => {
    if(res.status === 200 || res.status === 201) {
      res = res.body;
    }
    console.log('response: ', res);
    return res;
  }));
};
