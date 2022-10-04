import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TokenService } from './token.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './services/config.service';

/** Mock client-side authentication/authorization service */
@Injectable()

export class AuthService {
  public cmsAuthToken = "";
  cmsUrl = '';
  data = {
    email: 'cms@setnext.io',
    password: 'Muruga@321',
 };
 options = {headers: {
  "content-type": "application/json",
}};
  constructor(private http: HttpClient, private conf:ConfigService){
    this.cmsUrl = conf.contentServiceUrl;
  }
  getAuthorizationToken() {
    return 'some-auth-token';
  }

  setCMSAuthToken(token: string) {
    this.cmsAuthToken = "Bearer " + token;

  }
  fetchCMSAuthToken() {
    // if(this.cmsAuthToken==""){
    //   console.log("called only once");
    // this.tokenService.getCMSAuthToken()
    //   .subscribe({
    //     next: (data: any) => {
    //       console.log("data received");
    //       this.cmsAuthToken=data.data.token;
    //       console.log("token formed " + this.cmsAuthToken );
    //      }, // success path
    //     error: error => {
    //       console.log(error);
    //     }  // error path
    //   });
    // }
  //   return this.http.post<any>('http://localhost:1337/admin/login', {
  //     email: 'nithyananthababu.s@gmail.com',
  //     password: 'Muruga@321',
  //  },{headers: {
  //   "content-type": "application/json",
  // }}).subscribe(data => {
  //       console.log("token set");
  //       this.cmsAuthToken=data.data.token;
  //   });
  console.log("callled second");
  // return this.http.post<any>(this.cmsUrl,this.data,this.options).toPromise();
  }
  
  getCMSAuthToken() {
    return this.cmsAuthToken;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

