import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import {FormControl} from '@angular/forms';

import { Product } from '../Products/products';
import { ProductsService } from '../Services/products.service';
import { saveAs } from 'file-saver/FileSaver';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';  
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.css'],
  })

export class AggregationsComponent implements OnInit {

  showProgressBar: boolean;
  products$: Observable<Product[]>;
  mybox : String;
  events: string[] = [];
  lastDateInput: Date | null;
  lastDateChange: Date | null;
  dateCtrl = new FormControl();
  startdate: String | null;
  enddate:  String | null;

  private searchTerms = new Subject<string>();

  constructor(private productsService: ProductsService, private welfinityscriptsService: WelfinityscriptsService ) { }

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


  WDM_Extract_and_Aggregate_get_file(productCode: string){
    this.showProgressBar = true;
    
    this.welfinityscriptsService.WDM_Extract_and_Aggregate_GetFile(productCode,this.startdate,this.enddate).subscribe(data => { var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    var filename = 'aggregated.xls';
    
    saveAs(blob, filename);
    this.showProgressBar = false;
    });
    

  }


  addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startdate = moment(event.value).format('DD[/]MM[/]YYYY');
    console.log("MOMENT DATE " + this.startdate);
  }

  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.enddate = moment(event.value).format('DD[/]MM[/]YYYY');
    console.log("MOMENT DATE " + this.enddate);
  }

  enterProductCode(productCode: string) {
    console.log("Entered Value = "+productCode);
    this.mybox=productCode;
    }

}
