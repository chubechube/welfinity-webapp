import { Component, OnInit }        from '@angular/core';
import { Market }                   from '../markets/market';
import { MarketService }            from '../Services/market.service';
import { WelfinityscriptsService }  from '../Services/welfinityscripts.service';
import { Router }                   from "@angular/router";
import { HttpParams}                from "@angular/common/http";


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
  displayedColumns = ['country','name', 'description','actions'];
  highlightedRows = [];
  hoverindex=0;


  constructor(private marketService: MarketService, private welfinityscriptsService: WelfinityscriptsService, private router: Router ) { }

  ngOnInit() {
    this.getMarkets();
    this.showProgressBar = false;
  }

  getMarkets(): void {

    this.marketService.getMarkets().subscribe(markets => this.markets = markets);

  }

  onGenerateClicked(element): void {
    this.showProgressBar = true;
    var params = new HttpParams();
    params=params.append("marketname",element.name);    
    this.welfinityscriptsService.WIM_createMarkets(params).subscribe(data => {this.requetResult =  data['result'];   console.log('result ' + this.requetResult);
    this.showProgressBar = false;});
  
  }

  onRowHover(row){

    this.hoverindex = row;
  }

  onRowLeave(){

    this.hoverindex = 0;
  }

  onRowClicked(row) {
   
    this.highlightedRows.push(row);
}

 
onEditClicked(element){
  this.router.navigate(['/market_detail/'+element.name]);
  
}
onCreateClicked(){
  this.router.navigate(['/market_detail/']);
}
onDeleteClicked(element){
  this.marketService.deleteMarket(element.name).subscribe(data => this.marketService.getMarkets().subscribe(markets =>{ this.markets = markets}));
  
  
}

}

