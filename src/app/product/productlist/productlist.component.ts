import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faExpandAlt,faHeart,faShoppingBag,faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

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

  productList:productType[] =[]

  

  tabContext:any
  subCategory:any
  tabs:any =[]

  products =[];

  faExpandAlt = faExpandAlt;
  faHeart = faHeart;
  faShoppingBag = faShoppingBag;
  faStarHalf = faStarHalfAlt;

  faStar = faStar;


  constructor(private router: Router) { }
  

  ngOnInit(): void {

    this.tabContext = this.router.url.split("/products")[1]
    console.log("from Product Listing component")
    console.log(this.tabContext);
    console.log(this.productList.length)

    if(this.tabContext == '/fashion/all')
    {

      this.productList = [
        {pname:"Winter Sweater",tag:"sale",isOnSale:true, isOutOfStock:false,isNew:false, starRating:4,price:60,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Denim Dresses",tag:"new",isOnSale:false, isOutOfStock:true,isNew:false,starRating:3,price:80,imageUrl:"https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Empire Waist Dresses",tag:"outofstock",isOnSale:false, isOutOfStock:false,isNew:true,starRating:5,price:80,imageUrl:"https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Pinafore Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:3,price:20,imageUrl:"https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Denim Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:3,price:80,imageUrl:"https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Empire Waist Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:5,price:80,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Pinafore Dresses",tag:"sale",isOnSale:true, isOutOfStock:false,isNew:false,starRating:3,price:20,imageUrl:"https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Winter Sweater",tag:"new",isOnSale:true, isOutOfStock:false,isNew:false,starRating:4,price:60,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
      ]
      console.log(this.productList.length)
    }
    if(this.tabContext == '/fashion/women')
    {
      
      this.productList = [
        {pname:"women Sweater",tag:"sale",isOnSale:true, isOutOfStock:false,isNew:false, starRating:4,price:60,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Denim Dresses",tag:"new",isOnSale:false, isOutOfStock:true,isNew:false,starRating:3,price:80,imageUrl:"https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Empire Waist Dresses",tag:"outofstock",isOnSale:false, isOutOfStock:false,isNew:true,starRating:5,price:80,imageUrl:"https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Pinafore Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:3,price:20,imageUrl:"https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Denim Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:3,price:80,imageUrl:"https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Empire Waist Dresses",tag:"",isOnSale:false, isOutOfStock:false,isNew:false,starRating:5,price:80,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Pinafore Dresses",tag:"sale",isOnSale:true, isOutOfStock:false,isNew:false,starRating:3,price:20,imageUrl:"https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {pname:"Winter Sweater",tag:"new",isOnSale:true, isOutOfStock:false,isNew:false,starRating:4,price:60,imageUrl:"https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
      ]

    }


    
  }

}
