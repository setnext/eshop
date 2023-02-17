import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/productService/product.service';
import { faHome, faCheck, faStarHalf, faStarHalfStroke, faFileCircleExclamation, faTriangleExclamation, faClose, faExpandAlt, faHeart, faShoppingBag, faStar, faStarHalfAlt, faStarAndCrescent } from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from 'src/app/services/config.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ObjectType, User } from 'src/app/interfaces/User';
import { LocalService } from 'src/app/services/storage/local.service';
import { CartItem } from 'src/app/interfaces/CartItem';
import { CartService } from 'src/app/services/cartService/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
addToCart(product:any) {
  //console.log("addtocart called")
  //console.log(this.isLoggedIn);
  if(!this.isLoggedIn){
    this.router.navigateByUrl("/unauthcart")
  }
  else
  {
  let user = this.localStore.getData("customerInfo",ObjectType.json,true);
  let userId =  user._id;
  let cartItem:CartItem ={} as CartItem;
  cartItem.productName = product.productName;
  cartItem.category = product.subCategories[1];
  cartItem.imageUrl = product.productImages[0];
  cartItem.productDescription = product.productDescription;
  cartItem.productUrl = this.router.url;
  cartItem.quantity = 1;
  //console.log(product);
  //console.log("cartItem: ",cartItem);
  this.cartService.updateCartItem(cartItem,userId);

}


}


  pid: any;
  pname: any;
  product: any;
  imageUrl = ""
  error = "";
  loading = false;
  faFileCircleExclamation = faFileCircleExclamation;
  faTriangleExclamation = faTriangleExclamation;
  faStar = faStar
  faStarHalf = faStarHalfAlt;
  faStarHalfStroke = faStarHalfStroke
  faStarAndCrescent = faStarAndCrescent
  wishItem = false;
  isLoggedIn:boolean=false;



  faCheck = faCheck;
  landingCategory: any;
  landingUrl: any;
  selectedColor: any;
  selectedSize: any;
  selectedModel:any;
  currencySymbol: string="USD";


  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private config: ConfigService, private auth:AuthService, private localStore:LocalService,private cartService:CartService) { 

    // this.auth.LoginStatus()?this.isLoggedIn=true:this.isLoggedIn=false;

    this.auth.isLoggedIn$?.subscribe(loggedIn =>{
      //////console.log("header loggin status" + loggedIn);

      switch(loggedIn){
      case true:
        this.isLoggedIn=true;
        break;
      case false:
        this.isLoggedIn=false;
    }; 
  });

  }

  onChangeColor(e: any) {
    this.selectedColor.name = e.target.value;
  }
  onChangeSize(e: any) {
    this.selectedSize = e.target.value;
  }
  onChangeModel(e: any) {
    this.selectedModel = e.target.value;
    }
  ngOnInit(): void {

  this.auth.LoginStatus()?this.isLoggedIn=true:this.isLoggedIn=false;
  //console.log("logged in or not 1 ", this.isLoggedIn);
  //console.log("logged in or not 2 ",this.auth.LoginStatus());

  


    // this.pid = this.route.snapshot.paramMap.get('id')
    // this.pname = this.route.snapshot.paramMap.get('name')
    this.loading = true;
    this.imageUrl = this.config.config.imageCloudfrontURL+'images/';
    //console.log("Image Url",this.imageUrl);
    this.landingUrl = this.router.url;
    //console.log('curent url', this.router.url); 
    this.currencySymbol = this.config.config.currencySymbol;

    this.route.queryParams
      .subscribe(params => {
        //console.log("params",params); // { orderby: "price" }
        this.landingCategory = params['cat'].split('/');
       
        //console.log('landing ', this.landingCategory); // price
        //console.log('landing ', this.landingCategory.length);
      }
      );

    this.route.paramMap.subscribe((params: ParamMap) => {
      //console.log(params);

      this.pid = params.get('id')
      this.pname = params.get('name')

      //console.log("PID",this.pid);
      //console.log("PName",this.pname);





      this.productService.getProductsById(this.pid).subscribe(pdata => {

        //console.log(pdata);
        //console.log(pdata.productNotes);
        //console.log(pdata.product_notes);

        // //console.log("feature_attributes",pdata.feature_attributes);

        this.selectedColor = pdata.productVariants.colors[0];
        this.selectedSize = pdata.productVariants.sizes[0];
        this.selectedModel = pdata.productVariants.models[0];


       
        // pdata.additional_image_urls.unshift(pdata.image_url);

        this.product = pdata;
        this.loading = false;



      }, (error) => {
        this.loading = false;
        ////console.log(error);
        this.error = "Error at Server, Please try again in sometime"
      });



    })
  }

  wishlist(pid: any) {

    if (this.wishItem) {
      this.wishItem = false;
    }
    else {
      this.wishItem = true;
    }



    //console.log(pid);

  }
  over(image: any) {

    //console.log(image);

    (document.getElementById('main-image') as HTMLImageElement).src = this.imageUrl + image + '?d=1000x1500';

    //console.log('done');


  }
}

