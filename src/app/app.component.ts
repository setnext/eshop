import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'shop';

  constructor(private auth: AuthService){

  }
  ngOnInit() {
    // this.activatedRoute.data.subscribe(({ data }) => {
    //   console.log(data);
    //   console.log("here is the token " + data.data.token);
    //   // do something with your resolved data ...
    // })
    // console.log("got a token from Auth Service");
    // console.log(this.auth.getCMSAuthToken());
  }

  config = {
    headers: {
      'content-type': 'application/json',
    }
  }



 

  
    
}
