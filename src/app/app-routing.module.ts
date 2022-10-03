import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BannersComponent } from './banners/banners.component';
import { BaseComponent } from './base/base.component';
import { TestrouteComponent } from './testroute/testroute.component';
import { TokenResolver } from './token.resolver';


const routes: Routes = [
  { path: '', redirectTo: '/bannerHome', pathMatch: 'full' },
  { path: 'bannerHome', component: BannersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
