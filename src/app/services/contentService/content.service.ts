import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Banner } from './banner';
import { AuthService } from '../../auth.service';



@Injectable()
export class ContentService {
  bannerUrl = 'api/heroes';  // URL to web api
  private handleError: HandleError;

  
  // constructor(
  //   @SkipSelf() private http: HttpClient,private auth: AuthService,
  //   httpErrorHandler: HttpErrorHandler) {
  //   this.handleError = httpErrorHandler.createHandleError('ContentService');
  // }

  // /** GET heroes from the server */
  // getBanners(): Observable<Banner[]> {

  //   var httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       Authorization: this.auth.getCMSAuthToken()
  //     })
  //   };


  //   return this.http.get<Banner[]>(this.bannerUrl,httpOptions)
  //     .pipe(
  //       catchError(this.handleError('getBanners', []))
  //     );
  // }
}
