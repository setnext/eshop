import { Component, OnInit } from '@angular/core';
import {
  HttpClient, } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from '../services/storage/local.service';
import { ObjectType, User } from '../interfaces/User';
import { Router } from '@angular/router';
import { CartService } from '../services/cartService/cart.service';
import { Cart } from '../interfaces/Cart';
declare var window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
UnAuthorisedBasket() {

  //console.log("unauthorised Basket")
  this.router.navigateByUrl('/unauthcart')

}
  formModal: any;

  faShoppingCart = faShoppingCart;

  isLoggedIn:boolean=false;
  user:User = {} as User;
  cart: Cart = {} as Cart;

  constructor(private http: HttpClient, private auth:AuthService, private localstore:LocalService,private router: Router,private cartService:CartService) {

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      //////console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        this.isLoggedIn=true;
        this.user = this.localstore.getData("customerInfo",ObjectType.json,true);
        //console.log("user info :",this.user)

        break;
      case false:
        this.isLoggedIn=false;
    }; 
  });

  this.cartService.cart$?.subscribe(cart =>{
    this.cart=cart;
   
});
}



  ngOnInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('quoteForm')
    );

    if (this.localstore.getData("isLogged",ObjectType.text, false) && this.localstore.getData("isLogged",ObjectType.text, false)=="true")
    {
      this.isLoggedIn=true;
      this.user = this.localstore.getData("customerInfo",ObjectType.json,true);
    }
    else{
      this.isLoggedIn=false;
    }

  }

  logout(){
    this.auth.logout();

  }

  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
  

}
