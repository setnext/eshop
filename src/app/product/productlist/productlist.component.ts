import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faHome,faFileCircleExclamation,faTriangleExclamation,faClose, faExpandAlt,faHeart,faShoppingBag,faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigationService/nav.service';
import { ProductService } from 'src/app/services/productService/product.service';

export interface productType{
  pname:string
  tag:string
  starRating:number
  price:number,
  imageUrl:string,
  isOnSale:boolean,
  isOutOfStock:boolean,
  isNew:boolean
}

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {

  productList:any[] =[]

  error:String="";

  loading = false;
  showModal: boolean =false;

  page: number = 0;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  productCategory : any;

  

  tabContext:any
  subCategory:any
  tabs:any =[]

  products =[];

  faExpandAlt = faExpandAlt;
  faHeart = faHeart;
  faShoppingBag = faShoppingBag;
  faStarHalf = faStarHalfAlt;
  faClose=faClose;
  faFileCircleExclamation =faFileCircleExclamation;
  faTriangleExclamation = faTriangleExclamation;

  faStar = faStar;

  currentProduct:any;
  currentImageUrl="";

  pagedProducts:any;
  imageUrl: string="";
  currencySymbol="USD";
  CategoryHead: any;


  constructor(private router: Router, private productService:ProductService,private metaTagService:Meta,private title:Title,private config:ConfigService,private navigationService:NavigationService) { }
  
  show(productItem:any)
  {
   
    this.currentProduct = productItem;
    this.showModal = true; // Show-Hide Modal Check
    // this.currentImageUrl = productItem.image_Url.split("?d")[0]+"?d=1000x1500";
    // //console.log(this.currentProduct.pname);
    
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  onTableDataChange(event: any) {

    this.loading=true;
    this.error="";
    
    
    
    this.productService.getProductsByCategory(this.tabContext,event-1,this.tableSize).subscribe(data=>{

      
      //console.log("data.curentPage: ", data.currentPage);
      // //console.log("data.totalItems", data.totalItems);
      // //console.log("data.totalPages", data.totalPages);
    
      this.productList = data.products;
      this.page = event;
      this.count = data.totalItems;
      this.loading=false;


    },(error) => {
      this.loading=false;
      //console.log(error);
      this.error="Error at Server, Please try again in sometime"
    });
  }
  onTableSizeChange(event: any): void {
    //console.log("table size changes");
    this.tableSize = event.target.value;
    this.page = 1;
  }

  ngOnInit(): void {


    console.log("config is", this.router.config);

    console.log("Product List page landed");

    this.loading=true;

    this.imageUrl = this.config.config.imageCloudfrontURL;
    this.currencySymbol = this.config.config.currencySymbol;

   this.error="";
   this.productCategory =  this.router.url;
   

    this.tabContext = this.router.url.split("/products")[1]

    
    this.CategoryHead = this.tabContext.slice(1,this.tabContext.length);

    console.log("lenght", this.CategoryHead.split("/").length);
    if(this.CategoryHead.split("/").length==1)
    {
      this.CategoryHead  = this.CategoryHead + "/all";
    }
    
    this.navigationService.updateCategory( this.CategoryHead);

    this.title.setTitle("Eshop - Products Page" + this.tabContext);

  



    this.productService.getProductsByCategory(this.tabContext,this.page,this.tableSize).subscribe(data=>{

      
      //console.log("data.curentPage: ", data.currentPage);
      //console.log("data.totalItems", data.totalItems);
      //console.log("data.totalPages", data.totalPages);
    
      this.productList = data.products;
      
      this.count = data.totalItems;
      this.loading=false;
      


    },(error) => {
      this.loading=false;
      //console.log(error);
      this.error="Oops, Error at Server, Please try again in sometime"
    });


    
  }

}
