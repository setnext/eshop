import { Component, OnInit } from '@angular/core';
import {
  HttpClient, } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { 
  }

  ngOnInit() { 
    console.log(this.auth.cmsAuthToken);
 
    
  //   this.http.post<any>('http://localhost:1337/admin/login', {
  //     email: 'nithyananthababu.s@gmail.com',
  //     password: 'Muruga@321',
  //  },{headers: {
  //   "content-type": "application/json",
  // }}).subscribe(data => {
  //       console.log("http completed");
  //   });

  // this.http.get<any>('https://www.google.com/').subscribe(data => {
  //     console.log("http called");
  // });


  }
  

}
