import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Banner } from './banner';
import { AuthService } from '../authService/auth.service';
import { ConfigService } from '../config.service';
import { ProductService } from '../productService/product.service';



@Injectable()
export class ContentService {
  cmsUrl: any;  // URL to web api

  constructor(private config: ConfigService, private http: HttpClient,private productService:ProductService) {
    this.cmsUrl = config.config.contentServiceUrl;

  }

  fetchBanner(category: string): Observable<any> {
    
    return this.http.get<any>(this.cmsUrl + '/api/banners?populate=*&filters[category][$eq]=main').pipe(
      catchError((err) => {
        ////console.log(err);
        return throwError(err);    //Rethrow it back to component
      }));
  }

  fetchDeals(category:string):Observable<any>{
    return this.http.get<any>(this.cmsUrl + '/api/banners?populate=*&filters[category][$eq]=main').pipe(
      catchError((err) => {
        ////console.log(err);
        return throwError(err);    //Rethrow it back to component
      }));

  }
  
}

