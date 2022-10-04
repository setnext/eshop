import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { BaseComponent } from './base/base.component';
import { BannersComponent } from './banners/banners.component';
import { map, Observable, tap } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { ConfigService } from './services/config.service';
import { ProductModule } from './product/product.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export interface CMSToken {
  data:Data
}
export interface Data {

  token: string;
  user: string;
}


@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    HeaderComponent,
    BannersComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// http.post("http://adb686bccd78342258e8789eb0959882-1182732879.us-east-2.elb.amazonaws.com/admin/login",{
//   email: 'cms@setnext.io',
//   password: 'Muruga@321',
// },{headers: {
//   "content-type": "application/json",
// }})
//    .pipe(
//       tap(result =>  { 

//         var tokeData = result as CMSToken;
//         // console.log("token received");
//         //   console.log(tokeData.data.token)

        
//         auth.setCMSAuthToken(tokeData.data.token);

    
         

//         // console.log("Token has been set")
         
//       })
//    );




// Backup
// import { BrowserModule } from '@angular/platform-browser';
// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { AuthInterceptor } from './http-interceptors/auth-interceptor';
// import { AuthService } from './auth.service';
// import { TokenService } from './token.service';
// import { BaseComponent } from './base/base.component';
// import { BannersComponent } from './banners/banners.component';
// import { map, Observable, tap } from 'rxjs';
// import { FooterComponent } from './footer/footer.component';
// import { ConfigService } from './services/config.service';
// import { ProductModule } from './product/product.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// export interface CMSToken {
//   data:Data
// }
// export interface Data {

//   token: string;
//   user: string;
// }



// function initializeAppFactory(http: HttpClient, auth:AuthService,conf:ConfigService): () => Observable<any> {
//   return () => http.post(conf.contentServiceUrl +"/admin/login",{
//   email: 'cms@setnext.io',
//   password: 'Muruga@321',
// },{headers: {
//   "content-type": "application/json",
// }})
//    .pipe(
//       tap(result =>  { 

//         var tokeData = result as CMSToken;
//         // console.log("token received");
//         //   console.log(tokeData.data.token)

        
//         auth.setCMSAuthToken(tokeData.data.token);

    
         

//         // console.log("Token has been set")
         
//       })
//    );
// }

// // http.get('./config.json')
// //          .pipe(
// //           tap(configResult => {
// //               var configSvc= configResult as ConfigService;

            
// //            });


// @NgModule({
//   declarations: [
//     BaseComponent,
//     AppComponent,
//     HeaderComponent,
//     BannersComponent,
//     FooterComponent
    
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     ProductModule
//   ],
//   providers: [
//     AuthService,
//     {
//     provide: APP_INITIALIZER,
//     useFactory: initializeAppFactory,
//     deps: [HttpClient,AuthService,ConfigService],
//     multi: true
//   },
//     TokenService,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
   
    
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


// // http.post("http://adb686bccd78342258e8789eb0959882-1182732879.us-east-2.elb.amazonaws.com/admin/login",{
// //   email: 'cms@setnext.io',
// //   password: 'Muruga@321',
// // },{headers: {
// //   "content-type": "application/json",
// // }})
// //    .pipe(
// //       tap(result =>  { 

// //         var tokeData = result as CMSToken;
// //         // console.log("token received");
// //         //   console.log(tokeData.data.token)

        
// //         auth.setCMSAuthToken(tokeData.data.token);

    
         

// //         // console.log("Token has been set")
         
// //       })
// //    );
