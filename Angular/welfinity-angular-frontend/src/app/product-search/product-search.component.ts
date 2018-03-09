import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { Product } from '../Products/products';
import { ProductsService } from '../Services/products.service';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  products$: Observable<Product[]>;

  private searchTerms = new Subject<string>();

  constructor(private productsService: ProductsService) { }

    // Push a search term into the observable stream.
    search(term: string): void {
      this.searchTerms.next(term);
    }

  ngOnInit() {
    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productsService.searchProducts(term)),
    );
  }

}
