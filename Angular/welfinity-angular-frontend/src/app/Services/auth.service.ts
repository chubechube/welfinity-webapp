// auth.service.ts

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    Jwthelper = new JwtHelperService();
    tokenEndpoint = 'http://94.23.179.229:3030/login';
    constructor(private http: Http ) { }
   

    login(userName : string, userPassword :string) {
      var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var options = new RequestOptions({ headers: headers });
      var body = new URLSearchParams();

      
      console.log('userName '+ userName);
      console.log('userPassword '+ userPassword);
      body.set('userName', userName);
      body.set('userPassword', userPassword);
     
  
      return this.http.post(this.tokenEndpoint, body, options)
      .map(res => res.json())
      .subscribe(
          data => {
          
                    localStorage.removeItem('autorization_token');
                    localStorage.setItem('autorization_token', data.autorization_token);
 
          },
          error => console.log(error)
        );
  }

  getToken() {
    console.log("Token Requested ->"+localStorage.getItem('autorization_token'));
      return localStorage.getItem('autorization_token');
  }

  logout(){
      localStorage.removeItem('autorization_token');
  }

  loggedIn() : boolean {
    var token = localStorage.getItem('autorization_token');
    if(token!=null&&!this.Jwthelper.isTokenExpired(token)){
        return true;
    }else
    {
        return false;
    }
  }
}