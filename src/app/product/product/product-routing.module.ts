import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductlistComponent } from '../productlist/productlist.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';


const routes: Routes = [
    {path:'dp/:name/:id', component:ProductDetailComponent},
    {
        
        path: 'products/fashion',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    },
    {
        
        path: 'products/electronics',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    },
    {
        
        path: 'products/furniture',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    }
    ,
    {
        
        path: 'products/books',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    }
    ,
    {
        
        path: 'products/baby',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    },
    {
        
        path: 'products/beauty',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    }
    ,
    {
        
        path: 'products/pet',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    }
    ,
    {
        
        path: 'products/sports',
        component: ProductComponent,
        children: [
            {path: '', component: ProductlistComponent},
            {path: '**', redirectTo: ''}
          
          ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule implements OnInit {

    ngOnInit(): void {
        //console.log("product routing onInt");
        
    }
   }