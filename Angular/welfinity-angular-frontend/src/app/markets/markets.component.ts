import { Component, OnInit } from '@angular/core';
import { Market } from '../markets/market';
import { MarketService } from '../Services/market.service';
import { WelfinityscriptsService } from '../Services/welfinityscripts.service';
import { saveAs } from 'file-saver/FileSaver';



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

  WDM_Extract_and_Aggregate(productCode: string){
    this.showProgressBar = true;
   
    this.welfinityscriptsService.WDM_Extract_and_Aggregate(productCode).subscribe(data => {this.requetResult =  data['result'];   console.log('result ' + this.requetResult);
    this.showProgressBar = false;});

  }

  WDM_Extract_and_Aggregate_get_file(productCode: string){
    this.showProgressBar = true;
   
    this.welfinityscriptsService.WDM_Extract_and_Aggregate_GetFile(productCode).subscribe(data => { var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    var filename = 'aggregated.xls';
    saveAs(blob, filename);
      this.showProgressBar = false;
    });
    

  }

  enterProductCode(productCode: string) {
    console.log("Entered Value = "+productCode);
    }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.marketService.addMarket({ name } as Market)
      .subscribe(market => {
        this.markets.push(market);
      });
  }

  delete(market: Market): void {
    this.markets = this.markets.filter(h => h !== market);
    this.marketService.deleteMarket(market).subscribe();
  }
}

