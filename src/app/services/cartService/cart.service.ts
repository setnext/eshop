import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, throwError } from "rxjs";
import { Cart } from "src/app/interfaces/Cart";
import { CartItem } from "src/app/interfaces/CartItem";
import { ObjectType } from "src/app/interfaces/User";
import { AuthService } from "../authService/auth.service";
import { ConfigService } from "../config.service";
import { LocalService } from "../storage/local.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartItems$: Observable<CartItem[]> | undefined;
  private cartItems: Subject<CartItem[]>;

  cart$: Observable<Cart> | undefined;
  private cart: Subject<Cart> | undefined;


  private cartItemsArray: CartItem[] = []
  isLoggedIn: boolean = false;
  cartServiceUrl = ''


  constructor(private http: HttpClient, private localStore: LocalService, private config: ConfigService, private auth: AuthService,) {

    this.cartItems = new Subject<CartItem[]>();
    this.cartItems$ = this.cartItems.asObservable();
    this.cartServiceUrl = config.config.cartServiceUrl;

  }

  public updateCartItem(cartItem: CartItem, userId: string): void {

    this.getCart(userId).subscribe(result => {

      if (result.status = '404' && result.message == 'NO_CART_FOUND') {
        ////console.log("NO CART FOUND FOR THE USER :", userId);
        cartItem.itemNumber = this.cartItemsArray.length + 1;
        this.cartItemsArray.push(cartItem);

      }
      else {
        ////console.log("CART FOUND FOR THE USER :", userId);
        ////console.log("Existing Cart", result.data.data.cartItems)
        this.cartItemsArray = result.data.data.cartItems;
        cartItem.itemNumber = this.cartItemsArray.length + 1;
        this.cartItemsArray.push(cartItem);
      }

      this.cartItems?.next(this.cartItemsArray);
      let newCart: Cart = {} as Cart;
      newCart.userId = userId;
      newCart.cartItems = this.cartItemsArray;
      this.saveCart(newCart).subscribe(data => {
        ////console.log("Data Saved Successfully");
        ////console.log(data);
        this.cart?.next(newCart);

      });

    }, (e) => {
      ////console.log(e);
    },
      () => {
        // No errors, route to new page
      });


  }

  getCart(userId: string): Observable<any> {

    return this.http.get<any>(this.cartServiceUrl + '/cart/' + userId).pipe(
      catchError((err) => {
        ////console.log("errrorrrrr", err);
        return throwError(err);    //Rethrow it back to component
      }));
  }

  saveCart(cart: Cart): Observable<any> {
    ////console.log(cart);

    return this.http.post<any>(this.cartServiceUrl + '/cart', cart, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    }).pipe(
      catchError((err) => {
        ////console.log("error ", err)
        return throwError(err);    //Rethrow it back to component
      }));

  }



}