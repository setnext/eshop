import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,Subject, throwError } from 'rxjs';
import { ConfigService } from '../config.service';

/** Mock client-side authentication/authorization service */
@Injectable()

export class AuthService {
  isLoggedIn$: Observable<boolean> | undefined;
  private isLoggedIn: Subject<boolean>;
 
  constructor(private http: HttpClient){

    this.isLoggedIn = new Subject<boolean>();
    this.isLoggedIn$ = this.isLoggedIn.asObservable();
   
  }
  public updateLoggInStatus(isLoggedIn: boolean): void {
    this.isLoggedIn?.next(isLoggedIn);
}

}

