import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectType } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalService } from 'src/app/services/storage/local.service';

// Login Component - used to allow the user to login to the sysem
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
  loginFailedStatus = "";
  //#endregion sdasd

  //#region Constructor Start
  // Services: LocalService,AuthService,Router,HttpClient
  constructor(private http: HttpClient, private localStore: LocalService, private auth: AuthService, private router: Router) { }
  //#endregion Constructor - End

  //#region Init
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  //#endregion Init

  //#region Methods
  // Methods Names: onLoginSubmit
  //#region OnSubmit
  onLoginSubmit(data: any) {
    this.submitted = true;

    if (this.loginForm?.invalid) {
      return;
    }
    this.auth.login(data.userName.trim(), data.password.trim()).subscribe(data => {
      this.auth.updateLoggInStatus(true);
      this.auth.saveCustomerProfile(data.user,data.token)
      // this.localStore.saveData("isLogged", "true", ObjectType.text, false);
      // this.localStore.saveData('customerToken', data.token, ObjectType.text, false);
      
      // this.localStore.saveData('customerInfo', data.user, ObjectType.json, true);
      // const item = this.localStore.getData('customerInfo', ObjectType.json, true);
      this.auth.updateLoggInStatus(true);
      this.router.navigateByUrl('/')
    },
      error => {
        this.auth.updateLoggInStatus(false);

        switch (error['status']) {
          case 404:
            this.loginFailedStatus = "Login Failed, Check Email/Passwords are correct"
            break;
          case 401:
            this.loginFailedStatus = "Login Failed, Check Email/Passwords are correct"
            break;
          default:
            this.loginFailedStatus = "Login Failed, UnKnown Error"

        }

      })

  }
  //#endregion

  //#endregion Methods

}
