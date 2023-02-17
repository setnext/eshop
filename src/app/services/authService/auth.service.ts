import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { ConfigService } from '../config.service';
import { LocalService } from '../storage/local.service';
import { ObjectType, User } from 'src/app/interfaces/User';

/** Mock client-side authentication/authorization service */
@Injectable()

export class AuthService {
  isLoggedIn$: Observable<boolean> | undefined;
  firstName$: Observable<string> | undefined;
  private firstName: Subject<string>;
  private isLoggedIn: Subject<boolean>;
  configServiceUrl: String = "";
  customerInfo:User  = {} as User;
  customerToken: any | undefined


  constructor(private http: HttpClient, private localStore: LocalService, private config: ConfigService) {

    this.isLoggedIn = new Subject<boolean>();
    this.isLoggedIn$ = this.isLoggedIn.asObservable();
    this.firstName = new Subject<string>();
    this.firstName$ = this.firstName.asObservable();
    this.configServiceUrl = this.config.config.authServiceUrl;
    this.getCustomerInfo();
    this.getCustomerToken();
    //console.log("custinfo: ",this.customerInfo);
    //console.log("custToken: ",this.customerToken);

  }
  public updateLoggInStatus(isLoggedIn: boolean): void {

    this.isLoggedIn?.next(isLoggedIn);
    this.localStore.saveData("isLogged", isLoggedIn.toString(), ObjectType.text, false);


  }

  login(userName: string, password: string): Observable<any> {

    return this.http.post<any>(this.configServiceUrl + '/auth/signin', {
      email: userName,
      password: password,
    }, {
      headers: {
        "content-type": "application/json"
      }
    }).pipe(
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      }));


  }
  signup(user: User): Observable<any> {

    return this.http.post<any>(this.configServiceUrl + '/auth/signup', {
      user
    }, {
      headers: {
        "content-type": "application/json"
      }
    }).pipe(
      catchError((err) => {
        return throwError(err);    //Rethrow it back to component
      }));
  }

  LoginStatus() {
    //console.log("Checking Logging Status");

    const isLogged = this.localStore.getData("isLogged", ObjectType.text, false);
    //console.log("logged data fron local store",isLogged)
    if (isLogged != null && isLogged == "true") {
      return true;
    }
    else {
      return false;

    }

  }


  logout() {
    this.isLoggedIn?.next(false);

    this.localStore.clearData();
    this.localStore.saveData("isLogged", "false", ObjectType.text, false);
    // Clear All Auth Cookies from Local Storage
  }

  saveCustomerProfile(customerInfo: any, customerToken: any) {

    this.localStore.saveData('customerInfo', customerInfo, ObjectType.json, true);
    this.localStore.saveData('customerToken', customerToken, ObjectType.text, false);
    // Clear All Auth Cookies from Local Storage
  }
  getCustomerInfo() {
    if (this.LoginStatus()) {
      if(Object.keys(this.customerInfo).length==0){
        this.customerInfo = this.localStore.getData('customerInfo', ObjectType.json, true);
        

        return this.customerInfo;
      }
      else {
        return this.customerInfo;
      }
    }
    return this.customerInfo;;
    // Clear All Auth Cookies from Local Storage
  }
  getCustomerToken() {

    if (this.LoginStatus()) {
      if (this.customerToken == undefined) {
        this.customerToken = this.localStore.getData('customerToken', ObjectType.json, false);

        return this.customerToken;
      }
      else {
        return this.customerToken;
      }
    }

    // Clear All Auth Cookies from Local Storage
  }

}

