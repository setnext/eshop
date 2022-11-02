import { Component, OnInit } from '@angular/core';
import {
  HttpClient, } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {}
  

}
