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

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMarket();
  }

  getMarket(): void {
    const id = this.route.snapshot.paramMap.get('name');
    console.log('name in ' + id);
    this.marketService.getMarket(id).subscribe(val => console.log(val));
    this.marketService.getMarket(id)
      .subscribe(market => this.market = market[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
