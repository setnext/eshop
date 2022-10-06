import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { AuthService } from '../auth.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  data :any
  public cmsToken =""
  constructor(private auth: AuthService, private conf:ConfigService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('yes it is');
   
        const cmsToken = this.conf.authorizationHeader;
        console.log(cmsToken);

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