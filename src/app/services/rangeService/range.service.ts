import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "../config.service";


@Injectable({
    providedIn: 'root'
  })
  export class RangeService {

    rangeServiceUrl = '';


    constructor(private http: HttpClient,private config:ConfigService) {
      this.rangeServiceUrl = config.config.rangeServiceUrl;
    }


    getSubCategoriesByCategory(category:string):Observable<any>{


        return this.http.get<any>(this.rangeServiceUrl+'/api/v1/range/categories'+ category).pipe(
          catchError((err) => {
            ////console.log(err);
            return throwError(err);    //Rethrow it back to component
          }));
        
      
      }
    
}