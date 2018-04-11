import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: [ './market-detail.component.css' ]
})
export class MarketDetailComponent implements OnInit {
  @Input() market: Market;
  @Input() isCreation: Boolean;


  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private location: Location,
    
  ) { }

  ngOnInit(): void {
    var  market_name = this.route.snapshot.paramMap.get('name');
 
    if(market_name === null){
 
      this.market = new Market();
      this.isCreation = true;

     }else{
      this.getMarket(market_name);
      this.isCreation = false;

    }
  }

  getMarket(id): void {
    this.marketService.getMarket(id).subscribe(val => console.log(val));
    this.marketService.getMarket(id)
      .subscribe(market => this.market = market[0]);
  }

  goBack(): void {
    this.location.back();
  }

  create(): void{ 
    console.log("Button Create "+this.market.name);
    this.marketService.addMarket(this.market).subscribe(market => {this.location.back()});
  }

  update(): void{
    console.log("Button Update");
    this.marketService.updateMarket(this.market).subscribe(market => {this.location.back()});;
  }
}
