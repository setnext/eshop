import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AuthService } from './services/authService/auth.service';
import { BaseComponent } from './base/base.component';
import { BannersComponent } from './banners/banners.component';
import { map, Observable, tap } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { ConfigService } from './services/config.service';
import { ProductModule } from './product/product.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './services/navigationService/nav.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from './services/contentService/content.service';
import { UnauthcartComponent } from './unauthcart/unauthcart.component';
import { CartService } from './services/cartService/cart.service';

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

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
    FooterComponent,
    LoginComponent,
    SignupComponent,
    UnauthcartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ProductModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    NavigationService,
    ContentService,
    CartService
    
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
