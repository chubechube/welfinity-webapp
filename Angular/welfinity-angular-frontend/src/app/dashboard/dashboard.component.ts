import { Component, OnInit } from '@angular/core';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {



  constructor(private welfinityscriptsService: WelfinityscriptsService) { }

  ngOnInit() {
  
  }

  secret(){
    console.log("TEST HOOK");
    
  }
}
