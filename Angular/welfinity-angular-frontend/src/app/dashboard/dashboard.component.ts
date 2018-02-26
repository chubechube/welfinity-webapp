import { Component, OnInit } from '@angular/core';
import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  markets: Market[] = [];

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.getMarkets();
  }

  getMarkets(): void {
    this.marketService.getMarkets()
      .subscribe(markets => this.markets = markets.slice(1, 5));
  }
}
