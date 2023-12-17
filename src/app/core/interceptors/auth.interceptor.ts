// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth.service.service';


@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(private authService : AuthServiceService){

  }

  intercept(req : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer '+ this.authService.getToken());
    const modifiedReq = req.clone({
      headers
    });
    return next.handle(modifiedReq);
  }
}
