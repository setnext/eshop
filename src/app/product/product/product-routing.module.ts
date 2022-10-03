import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductlistComponent } from '../productlist/productlist.component';


const routes: Routes = [
    {
        
        path: 'products/fashion',
        component: ProductComponent,
        children: [
            {path: 'all', component: ProductlistComponent},
            {path: 'women', component: ProductlistComponent},
            {path: 'men', component: ProductlistComponent},
            {path: 'kids', component: ProductlistComponent},
            {path: 'accessories', component: ProductlistComponent},
            {path: 'cosmetics', component: ProductlistComponent},
            {path: '', redirectTo: 'all', pathMatch: 'full' }
          
          ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }