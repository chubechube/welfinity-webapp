import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
  })

export class LoginComponent {
    returnUrl: string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {}
 
     username : string
     password : string
     
     ngOnInit() {
        // reset login status
        this.auth.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        
    }

  login() : void {
      
   this.auth.login(this.username,this.password);
   if(this.auth.loggedIn()){
       console.log("I'm Here " );
       console.log("return url "+this.returnUrl );
    this.router.navigateByUrl(this.returnUrl);
   }
  }
    
}