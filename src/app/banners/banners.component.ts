import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { ConfigService } from '../services/config.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/productService/product.service';
import { ContentService } from '../services/contentService/content.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css'],
  providers: [NgbCarouselConfig]
})
export class BannersComponent implements OnInit {
  banners:any=[];
  smbanners:any=[];
  
  cmsOrigin:string=""
  loading = false;
  total = 0;
  total1 = 0;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private auth:AuthService, private cmsService:ContentService, private http: HttpClient, private conf:ConfigService, caro:NgbCarouselConfig,private productService:ProductService) {

    caro.interval = 3000;
    caro.keyboard = true;
    caro.pauseOnHover = true;
   }

  ngOnInit(){
    this.loading=true;
    
    const token = this.conf.config.authorizationHeader;
    this.cmsOrigin = this.conf.config.contentServiceUrl;
     var imgArray =[];
     this.cmsService.fetchBanner("main").subscribe(data => {
      //console.log(data);
      this.banners = data;
      this.loading=false;
     
  });  

  }

}
