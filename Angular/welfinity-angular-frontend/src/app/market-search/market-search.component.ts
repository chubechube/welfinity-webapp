import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';

@Component({
  selector: 'app-market-search',
  templateUrl: './market-search.component.html',
  styleUrls: [ './market-search.component.css' ]
})
export class MarketSearchComponent implements OnInit {
  markets$: Observable<Market[]>;
  private searchTerms = new Subject<string>();

  constructor(private marketService: MarketService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.markets$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.marketService.searchMarkets(term)),
    );
  }
}
