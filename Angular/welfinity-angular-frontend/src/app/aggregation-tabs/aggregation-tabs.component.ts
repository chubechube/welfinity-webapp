import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';

@Component({
  selector: 'aggragation-tabs',
  templateUrl: './aggragation-tabs.component.html',
  styleUrls: [ './aggragation-tabs.component.css' ]
})

export class AggregationTabsComponent implements OnInit {
  @Input() market: Market;


  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private location: Location,
    
  ) { }

  ngOnInit(): void {
      }

 
}
