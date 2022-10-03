import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  tabContext:any

  tabs:any =[]

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.tabContext = this.router.url.split("/products")[1]

    console.log(this.tabContext[1])
    
    if(this.tabContext == '/fashion/all')
    {
      console.log('fashion found');

    this.tabs = [{"name":"All","isActive":true, "path":"/all"},
    {"name":"Women","isActive":false, "path":"/women"},
    {"name":"Men","isActive":false, "path":"/men"},
    {"name":"Kids","isActive":false, "path":"/kids"},
    {"name":"Accessories","isActive":false, "path":"/accessories"}, 
    {"name":"Cosmetics","isActive":false, "path":"/cosmetics"}]
  }
  }

}
