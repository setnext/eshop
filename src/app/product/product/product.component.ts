import { ChangeDetectorRef, Component, enableProdMode, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { from } from 'rxjs';
import { RangeService } from 'src/app/services/rangeService/range.service';
import { ProductlistComponent } from '../productlist/productlist.component';
import { faHome,faFileCircleExclamation,faTriangleExclamation,faClose, faExpandAlt,faHeart,faShoppingBag,faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from 'src/app/services/navigationService/nav.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  tabContext:any
  CategoryHead:any;

  tabs:any =[]
  loading = false;

  subMenus:any;

  constructor(private router: Router,private range:RangeService,private navigationService:NavigationService,private cdr: ChangeDetectorRef) {
    this.navigationService.category$?.subscribe(category =>{
      this.CategoryHead = category;
    });

   }


  getSubCategories(category:String){

    //console.log("Fetching Sub Menus");
    //console.log(this.router.url);
    if(this.tabContext.split("/").length!=2){
      let contexts = this.tabContext.split("/");
      this.tabContext = "/" + contexts[1];
      
    }


    this.range.getSubCategoriesByCategory(this.tabContext).subscribe(data=>{
      ////console.log("Received Sub Menus");
      
      
      
      data.unshift( {
        "category": this.tabContext,
        "sub_category": "All",
        "display_name": "All",
        "sub_category_path":"/",
        "is_active": false,
        "is_landing_category": false,
        "priority_level": 1,
        "is_root_category": false
    });
     
      this.tabs  = data;

      ////console.log(this.router.config);

      if(this.tabContext.split("/").length==2){

        ////console.log("root route");
        
       
        let routeNow = this.router.config;

        let routeNew:any = [];
        
        data.forEach((e:any) => {
          if(e.sub_category=="All")
          {
            routeNew.push({path:'',component:ProductlistComponent});
          }
          else{
          let newRoute = {path:e.sub_category,component:ProductlistComponent}
          routeNew.push(newRoute);
        }
        });

        routeNow.forEach((e:any,i) => {
          // ////console.log(this.router.url);
          ////console.log(e.path);
          
          if("/" +e.path==this.router.url){
            routeNow[i].children = routeNew;
            return true;
          }
           
           return true;
           
        });
      

        // this.router.resetConfig(routeNow);

          // routeNow.forEach
        // routeNow.find((o,i) => {
        //   ////console.log(o.path);
        //   if (o.path === this.router.url) {
        //     ////console.log("route found");
        //     routeNow[i].children = routeNew ;
        //     ////console.log(routeNow);
        //       return true; // stop searching
        //   }
        //   return true;
        // });
       
      
        

        
      }
      // data.array.forEach(cat => {
      //   this.router.resetConfig([
      //     { path: 'somePath', component: SomeComponent},
      //     ...
      //    ]);
        
      // });

      // ////console.log(data);
      
      this.loading=false;
      return data;

    },(error) => {
      ////console.log(error);
    });

  }

//   private createRoutes(json:any) {
//     return from(json.routeSpecs).pipe( // 2
//         map(spec => this.toRoutes(spec)), // 3
//         map(routes => ([ // 4
//             ...this.router.config,
//             ...routes,
//         ])),
//         map(newRoutes => this.router.resetConfig(newRoutes)) // 5
//     );
// }


ngAfterViewInit() {
   //console.log("Landing Page Component Main");

   this.loading=true;

   this.tabContext = this.router.url.split("/products")[1]
   this.CategoryHead = this.tabContext.slice(1,this.tabContext.length);

   //console.log("this.CategoryHead",this.CategoryHead)

  

   ////console.log(this.tabContext);
   this.getSubCategories(this.tabContext);
  this.cdr.detectChanges();
}

  ngOnInit(): void {

    //console.log("Landing Page Component Main");

    // this.loading=true;

    // this.tabContext = this.router.url.split("/products")[1]
    // this.CategoryHead = this.tabContext.slice(1,this.tabContext.length);

    // //console.log("this.CategoryHead",this.CategoryHead)

   

    // ////console.log(this.tabContext);
    // this.getSubCategories(this.tabContext);
    

   

  }

}
