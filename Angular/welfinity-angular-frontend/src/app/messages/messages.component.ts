import { MessageService } from '../Services/message.service';
import { AuthService } from '../Services/auth.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Router, CanActivate ,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService, public authService: AuthService, public router: Router) {}
  label:String;
  color:String;

  
  private subscription: Subscription;
  ngOnInit() {
    let timer = TimerObservable.create(2000, 60000);
    this.subscription = timer.subscribe(t => {
     this.tickerFunc(t);
    });
  }

  ngOnDestroy(){
    console.log("Destroy timer");
    // unsubscribe here
    this.subscription.unsubscribe();

}

  tickerFunc(tick){
        console.log(this.authService.loggedIn());
        if(!this.authService.loggedIn()) {
          this.router.navigate(['login'],{ queryParams: { returnUrl: this.router.url }});
        }
        
    }
}
