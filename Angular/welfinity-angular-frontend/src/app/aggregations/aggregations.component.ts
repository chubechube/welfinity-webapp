import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {HttpParams} from "@angular/common/http";
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
  startdate: string | null;
  enddate:  string | null;

  displayedColumns = ['aic', 'description'];
  dataSource = new MatTableDataSource();
  product_table_item: ProductElement[] =[];
 
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



  WDM_Extract_and_Aggregate_Multiple(){
    this.showProgressBar = true;
    var params = new HttpParams()
  
    for (var i = 0, len = this.product_table_item.length; i < len; i++) {
     
      params=params.append("productcodes[]",this.product_table_item[i].aic);
     }

     //params=params.append("productcodes[]",this.product_table_item[this.product_table_item.length-1].aic);
  
     params=params.append("startdate",this.startdate);
     params=params.append("enddate",this.enddate);
    this.welfinityscriptsService.WDM_Extract_and_Aggregate_Multiple(params).subscribe(data => { var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    var filename = 'aggregated.xls';
    
    saveAs(blob, filename);
    this.showProgressBar = false;
    });
    

  }

  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startdate = moment(event.value).format('DD[/]MM[/]YYYY');

  }

  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.enddate = moment(event.value).format('DD[/]MM[/]YYYY');

  }

  enterProductCode(productCode: string) {
    console.log("Entered Value = "+productCode);
    this.mybox=productCode;
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    addProductToTable(productCode: string, description: string){
     this.product_table_item.push({aic: productCode, description: description});
     this.dataSource.data=this.product_table_item;
    }

}

export interface ProductElement {
  aic: string;
  description: string;
 
}

