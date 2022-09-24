import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  data :any
  public cmsToken =""
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('yes it is');
    // Get the auth token from the service
        
    
        const cmsToken = this.auth.getCMSAuthToken();
        console.log(cmsToken);

        // console.log("interceptor call with token " + cmsToken);
   
    
    // const authToken = this.auth.getCMSAuthToken();

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
     req = req.clone({ setHeaders: { Authorization: cmsToken } });

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/