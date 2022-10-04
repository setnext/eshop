import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  banners:any=[];
  smbanners:any=[];
  cmsOrigin = '';

  constructor(private auth:AuthService, private http: HttpClient, private conf:ConfigService) { }

  ngOnInit(){

    const token = this.conf.authorizationHeader;
    this.cmsOrigin = this.conf.contentServiceUrl;
  
    

     var imgArray =[];   
    this.http.get<any>(this.conf.contentServiceUrl+'/api/banners?populate=*', {headers: {
    "Authorization": token,
  }}).subscribe(data => {
        console.log("banner received");
        this.banners = data;
        console.log(data.data[0].attributes.image.data.attributes.formats.large.url);
       
    });

    this.http.get<any>(this.conf.contentServiceUrl+'/api/banner-sms?populate=*', {headers: {
    "Authorization": token,
  }}).subscribe(data1 => {
        console.log("banner-sm data received");
        this.smbanners = data1.data;
        console.log(data1.data);
        console.log(this.smbanners[0].attributes.image.data.attributes.formats.small.url);
        // this.smbanners.array.forEach((element: any) => {
        //   console.log(element);
        // });
    });

    

    // for (let i = 0; banners.length -1; i++) {
    //   console.log(banners[0].Image.large.url);
    // }
   
 
    

  }

}
