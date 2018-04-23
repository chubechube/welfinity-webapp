import { Component, OnInit  } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit  {


  dataTable: ProductElement[] = [
    {code: "123", description: 'Hydrogen'},
    {code: "456", description: 'Helium'}
  ];

  constructor() { }
  

  ngOnInit() {
  
  }



  secret(){
    console.log("TEST HOOK");
     
  }
}
  
export interface ProductElement {
  code: string;
  description: string;
}



