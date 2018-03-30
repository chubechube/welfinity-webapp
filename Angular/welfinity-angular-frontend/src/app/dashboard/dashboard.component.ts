import { Component, OnInit } from '@angular/core';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

 // markets: Market[] = [];

  constructor(private welfinityService: WelfinityscriptsService) { }

  ngOnInit() {
   // this.getMarkets();
  }

  
}
