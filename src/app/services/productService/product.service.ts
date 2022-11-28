import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  export class ProductService {


    constructor(private http: HttpClient) { }


    getProductsByCategory(category:string,page:number,size:number ):Observable<any>{

        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('size', size);

        return this.http.get<any>('http://localhost:8075/products/categories'+ category,{params: params}).pipe(
          catchError((err) => {
            //console.log(err);
            return throwError(err);    //Rethrow it back to component
          }));
        
      
      }

      getProductsById(id:string):Observable<any>{

        return this.http.get<any>('http://localhost:8075/products/'+ id).pipe(
          catchError((err) => {
            //console.log(err);
            return throwError(err);    //Rethrow it back to component
          }));
        
      
      }
  


}