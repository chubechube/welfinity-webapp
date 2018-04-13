import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HttpParams} from "@angular/common/http";
import { Market } from '../markets/market';

//Services
import { MarketService } from '../Services/market.service';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service';

//File saver
import { saveAs } from 'file-saver/FileSaver';

//Data Utilities
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';  
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-aggregation-market',
  templateUrl: './aggregation-market.component.html',
  styleUrls: [ './aggregation-market.component.css' ]
})

export class AggregationMarketComponent implements OnInit {
  @Input() market: Market;
  showProgressBar: boolean;
  markets: Market[];
  selectedMarket: Market;
  displayedColumns = ['country','name', 'description','codes','action_aggregate'];
  highlightedRows = null;
  hoverindex=0;
  startdate: string | null;
  enddate:  string | null;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService,
    private location: Location,
    private welfinityscriptsService: WelfinityscriptsService
   ) { }

  ngOnInit(): void {
    this.getMarkets();
      }

  getMarkets(): void {
    this.marketService.getMarkets().subscribe(markets => this.markets = markets);
      }

  onRowHover(row){
    this.hoverindex = row;
      }
    
  onRowLeave(){
    this.hoverindex = 0;
      }
    
  onRowClicked(row) {
    console.log("Selected "+row.codici);
    this.highlightedRows = row;
    
    }
  
  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startdate = moment(event.value).format('DD[/]MM[/]YYYY');
    console.log("START DATE "+this.startdate);
    }
  
  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.enddate = moment(event.value).format('DD[/]MM[/]YYYY');
    console.log("END DATE "+this.enddate); 
    }

   onAggregateClicked(row){
    this.WDM_Extract_and_Aggregate_Multiple(row);
  }

  WDM_Extract_and_Aggregate_Multiple(row){
    this.showProgressBar = true;
    var params = new HttpParams()
    console.log("ROW CODICI IN CHIAMATA "+row.codici);
    var codes = this.createCodesArray(row.codici);

    for (var i = 0, len = codes.length; i < len; i++) {
        params=params.append("productcodes[]",codes[i]);
         }
    
    
    params=params.append("startdate",this.startdate);
    params=params.append("enddate",this.enddate);
    this.welfinityscriptsService.WDM_Extract_and_Aggregate_Multiple(params).subscribe(data => { var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    var filename = 'aggregated.xls';
    saveAs(blob, filename);
    this.showProgressBar = false;
     });
  
    }
     
    createCodesArray(codesString){
      return codesString.toString().split(",");
  
    }
  
}
