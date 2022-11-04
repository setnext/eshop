import { Component, OnInit } from '@angular/core';
import {
  HttpClient, } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from '../services/storage/local.service';
import { ObjectType } from '../interfaces/User';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  isLoggedIn:boolean=false;

  constructor(private http: HttpClient, private auth:AuthService, private localstore:LocalService) {

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      //console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        this.isLoggedIn=true;
        localstore.saveData("isLogged","true",ObjectType.text, false);
        break;
      case false:
        this.isLoggedIn=false;
    }; 
  });
}

  ngOnInit() {
    if (this.localstore.getData("isLogged",ObjectType.text, false) && this.localstore.getData("isLogged",ObjectType.text, false)=="true")
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }

  }

  logout(){
    this.auth.logout();

  }
  

}
