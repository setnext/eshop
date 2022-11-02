import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
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
  //#endregion sdasd

  //#region Constructor Start

  constructor(private http:HttpClient,private localStore:LocalService,private auth:AuthService) { }
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
    console.log("submit");

    if (this.loginForm?.invalid) {
      console.log(this.loginForm);
      console.log("form is invalid")
      return;
    }

    this.http.post<any>('http://localhost:3000/auth/signin', {
      email: data.userName,
      password: data.password,
   },{headers: {
    "content-type": "application/json"}}).subscribe(data => {
        console.log("Login Completed Successfully");
        console.log(data);
        // console.log(data.token);
        // this.localStore.saveData('customerToken', data.token,false);
        // console.log('decrpted data ', this.localStore.getData('customerToken',false));
    });

    this.auth.updateLoggInStatus(true);


  }
  //#endregion

  //#endregion Methods

}
