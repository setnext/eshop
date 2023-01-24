import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { LocalService } from "../storage/local.service";

@Injectable({
    providedIn: 'root'
  })
  
export class NavigationService {
    isLoggedIn$: Observable<boolean> | undefined;
    category$: Observable<string> | undefined;
    private category: Subject<string>;
    private isLoggedIn: Subject<boolean>;

   

    
    constructor(private http: HttpClient,private localStore:LocalService){

        this.isLoggedIn = new Subject<boolean>();
        this.isLoggedIn$ = this.isLoggedIn.asObservable();
        this.category = new Subject<string>();
        this.category$ = this.category.asObservable();
    
       
      }
      public updateCategory(category: string): void {
        this.category?.next(category);
    }
    
}


