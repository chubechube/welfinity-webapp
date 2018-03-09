import { Component, OnInit } from '@angular/core';
import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service';




@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})


export class MarketsComponent implements OnInit {

  markets: Market[];
  selectedMarket: Market;
  showProgressBar: boolean;
  requetResult: String;


  constructor(private marketService: MarketService, private welfinityscriptsService: WelfinityscriptsService ) { }

  ngOnInit() {
    this.getMarkets();
    this.showProgressBar = false;
  }

  getMarkets(): void {

    this.marketService.getMarkets().subscribe(markets => this.markets = markets);

  }

  WIM_createMarket(): void {
    this.showProgressBar = true;
   
    this.welfinityscriptsService.WIM_createMarkets().subscribe(data => {this.requetResult =  data['result'];   console.log('result ' + this.requetResult);
    this.showProgressBar = false;});
  
  }

 

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.marketService.addMarket({ name } as Market)
      .subscribe(market => {
        this.markets.push(market);
      });
  }

}

