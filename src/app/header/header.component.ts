import { Component, OnInit } from '@angular/core';
import {
  HttpClient, } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from '../services/storage/local.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean=false;

  constructor(private http: HttpClient, private auth:AuthService, private localstore:LocalService) {

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      //console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        this.isLoggedIn=true;
        localstore.saveData("isLogged","true",false);
        break;
      case false:
        this.isLoggedIn=false;
    }; 
  });
}

  ngOnInit() {
    if (this.localstore.getData("isLogged",false)=="true")
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
