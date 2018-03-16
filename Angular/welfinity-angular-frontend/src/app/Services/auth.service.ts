// auth.service.ts
import { MessageService } from '../Services/message.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams , Response} from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    Jwthelper = new JwtHelperService();
    tokenEndpoint = 'http://94.23.179.229:3030/login';
    constructor( private http: Http,
                 private messageService: MessageService
     ) { }
   

    login(userName : string, userPassword :string) : Observable<boolean> {
      var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var options = new RequestOptions({ headers: headers });
      var body = new URLSearchParams();

      
      console.log('userName '+ userName);
      console.log('userPassword '+ userPassword);
      body.set('userName', userName);
      body.set('userPassword', userPassword);
     
  
      return this.http.post(this.tokenEndpoint, body, options).catch((error): any => {
        console.log('************* ERROR Response', error);
        this.messageService.add("Authentication Error");
        return Observable.throw(error);
    }).map((res : Response) =>  {
                    console.log(JSON.stringify(res));
                    localStorage.removeItem('autorization_token');
                    localStorage.setItem('autorization_token', res.json().autorization_token);
             
                    return true;
 
          })
          
        
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