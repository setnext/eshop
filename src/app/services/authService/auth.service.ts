import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,Subject, throwError } from 'rxjs';
import { ConfigService } from '../config.service';
import { LocalService } from '../storage/local.service';

/** Mock client-side authentication/authorization service */
@Injectable()

export class AuthService {
  isLoggedIn$: Observable<boolean> | undefined;
  private isLoggedIn: Subject<boolean>;
 
  constructor(private http: HttpClient,private localStore:LocalService){

    this.isLoggedIn = new Subject<boolean>();
    this.isLoggedIn$ = this.isLoggedIn.asObservable();
   
  }
  public updateLoggInStatus(isLoggedIn: boolean): void {
    this.isLoggedIn?.next(isLoggedIn);
    this.localStore.saveData("isLogged",isLoggedIn.toString(),false);
}

login(userName:string,password:string):Observable<any>{

  return this.http.post<any>('http://localhost:3000/auth/signin', {
    email: userName,
    password: password,
 },{headers: {
  "content-type": "application/json"}}).pipe(
    catchError((err) => {
      //console.log('error caught in service')
     

      //Handle the error here

      return throwError(err);    //Rethrow it back to component
    }));
  

}

logout(){
  this.isLoggedIn?.next(false);
  this.localStore.saveData("isLogged","false",false);
  // Clear All Auth Cookies from Local Storage
}
recordCustomerProfile(){
  this.isLoggedIn?.next(false);
  this.localStore.saveData("isLogged","false",false);
  // Clear All Auth Cookies from Local Storage
}

}

