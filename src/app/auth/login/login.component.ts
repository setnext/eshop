import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalService } from 'src/app/services/storage/local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region Variable Declaration
  submitted = false;
  loginForm: any;
  userName: any;
  password: any;
  loginFailedStatus ="";
  //#endregion sdasd

  //#region Constructor Start

  constructor(private http:HttpClient,private localStore:LocalService,private auth:AuthService,private router: Router) { }
  //#endregion Constructor - End

  //#region Init
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  //#endregion Init

  //#region Methods

  //#region OnSubmit
  onLoginSubmit(data: any) {
    this.submitted = true;
    
    if (this.loginForm?.invalid) {
      return;
    }
    this.auth.login(data.userName,data.password).subscribe(result=>{
      this.auth.updateLoggInStatus(true);
      this.router.navigateByUrl('/')
    },
    error=>{
      this.auth.updateLoggInStatus(false);
      //console.log(error['status']);
      switch(error['status']){
        case 401:
          //console.log("Login Failed, Check Email/Passwords are correct ");
          this.loginFailedStatus = "Login Failed, Check Email/Passwords are correct"
          break;
        default:
          //console.log("Login Failed, UnKnown Error");
          this.loginFailedStatus = "Login Failed, UnKnown Error"

      } 

    })

  }
  //#endregion

  //#endregion Methods

}
