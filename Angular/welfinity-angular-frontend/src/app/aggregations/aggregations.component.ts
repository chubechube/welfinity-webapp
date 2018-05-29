import { ChangeDetectionStrategy, Component, OnInit, ViewChild }  from '@angular/core';
import { Router }                                                 from "@angular/router";
import { FormControl}                                             from '@angular/forms';
import { HttpParams}                                              from "@angular/common/http";
import { MomentDateAdapter}                                       from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE}          from '@angular/material/core';
import { MatDatepickerInputEvent}                                 from '@angular/material/datepicker';  
import { WelfinityscriptsService }                                from '../Services/welfinityscripts.service';
import { MarketService }                                          from '../Services/market.service';
import { Observable }                                             from 'rxjs/Observable';
import { Subject }                                                from 'rxjs/Subject';
import { of }                                                     from 'rxjs/observable/of';
import { Product }                                                from '../Products/products';
import { saveAs }                                                 from 'file-saver/FileSaver';
import { ProductTableComponent }                                  from '../products-table-component/product-table.component';
import { Market }                                                 from '../markets/market';
import * as _moment                                               from 'moment';
import {default as _rollupMoment}                                 from 'moment';
import { debounceTime, distinctUntilChanged, switchMap}           from 'rxjs/operators';



const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.css'],
  })

export class AggregationsComponent implements OnInit {

  @ViewChild(ProductTableComponent)
  private productTableComponent: ProductTableComponent;
  showProgressBar: boolean;
  lastDateInput: Date | null;
  lastDateChange: Date | null;
  dateCtrl = new FormControl();
  startdate: string | null;
  enddate:  string | null;

  product_table_item: ProductElement[] =[];
  selected_item : ProductElement= null;
 
 

  private searchTerms = new Subject<string>();

  constructor(private welfinityscriptsService: WelfinityscriptsService,private marketService: MarketService, private router: Router) { 
    
    
  }

  ngOnInit() {}


  performAggregation(){

    //support market creation
    this.showProgressBar = true;
    var supportMarket = new Market();
    supportMarket.name="tempMarket"+Date.now();
    supportMarket.codici=this.productTableComponent.createProductCodesStringArray();
    supportMarket.country="Neverland";
    supportMarket.description="tempmarketforaggregation";
    
    this.marketService.addMarket(supportMarket).subscribe(market => {
      //Market Support Table Generation
      var params = new HttpParams();
      params=params.append("marketname",supportMarket.name);    
      this.welfinityscriptsService.WIM_createMarkets(params).subscribe(data => {

        //Aggregation
    
          var params = new HttpParams()
            
          for (var i = 0, len = supportMarket.codici.length; i < len; i++) {
            
            params=params.append("productcodes[]",supportMarket.codici[i].toString());
            console.log("PRODUCT " +supportMarket.codici[i].toString());
          }

          params=params.append("marketname",supportMarket.name);
          params=params.append("startdate",this.startdate);
          params=params.append("enddate",this.enddate);
          this.welfinityscriptsService.WDM_Extract_and_Aggregate_Multiple(params).subscribe(data => { var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
          var filename = 'aggregated.xls';
          
          saveAs(blob, filename);
          
            //Market Support Table Delete
            this.marketService.deleteMarket(supportMarket.name).subscribe(data => this.marketService.getMarkets().subscribe(markets =>{ 
            this.showProgressBar = false;
            }));
          });
    
    
    
    });
    
    });

  }

  createMarket(){
    this.marketService.setLocalTempProductList(this.product_table_item);
    this.router.navigate(['/market_detail/' ]);
  }

  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startdate = moment(event.value).format('DD[/]MM[/]YYYY');
  }

  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.enddate = moment(event.value).format('DD[/]MM[/]YYYY');

  }

  onProductSelected(product: string[]){
      this.productTableComponent.addElementStrings(product[0],product[1]);
      this.selected_item = {code: product[0], description: product[1]};
    }
    
    
}

export interface ProductElement {
  code: string;
  description: string;
 
}





