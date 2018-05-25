import { Component, OnInit, Input,ViewChild }   from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';
import { Location }                             from '@angular/common';
import { HttpParams}                            from "@angular/common/http";
import { MatTableDataSource}                    from '@angular/material';
import { Observable }                           from 'rxjs/Observable';
import { Market }                               from '../markets/market';
import { MarketService }                        from '../Services/market.service';
import { WelfinityscriptsService }              from '../Services/welfinityscripts.service';
import { ProductsService }                      from '../Services/products.service';
import { ProductTableComponent }                from '../products-table-component/product-table.component';
import { Product } from '../Products/products';


@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: [ './market-detail.component.css' ]
})
export class MarketDetailComponent implements OnInit {
  @Input() market: Market;
  @Input() isCreation: Boolean;
  @ViewChild(ProductTableComponent) private productTableComponent: ProductTableComponent;

  private initial_products : ProductElement[]=[];
  showProgressBar: boolean;
  requetResult: String;


  constructor(
    private route:                    ActivatedRoute,
    private marketService:            MarketService,
    private productsService:          ProductsService,
    private location:                 Location,
    private welfinityscriptsService:  WelfinityscriptsService
  ) { }

  ngOnInit(): void {
    
    this.initializeTable()
  }
  

  initializeTable(){
    var  market_name = this.route.snapshot.paramMap.get('name');
    if(market_name === null){
      this.market = new Market();
      this.isCreation = true;
      var initialproducts = this.marketService.getLocalTempProductList();
      for (var key in initialproducts) {
        this.initial_products.push(initialproducts[key]);
        }
     }else{
      this.isCreation = false;
      var first = this.marketService.getMarket(market_name);
      first.flatMap(((market) => {
        this.market=market[0];
        return this.productsService.createProductListFromCodeList(market[0].codici)
      })).subscribe(productList => {
        var tmpProductList: ProductElement []=[];
        for (var key in productList) {
          tmpProductList.push({code: productList[key].FDI_0001,description: productList[key].FDI_0004});
          }
          this.initial_products = tmpProductList;
        })
    }
  }
  
  onProductSelected(product: string[]){
    this.productTableComponent.addElementStrings(product[0],product[1]);
  }

  getMarket(id): any {
    this.marketService.getMarket(id)
      .subscribe(market => {
        this.market = market[0]
        var productElementArray : ProductElement[] = [];
        this.productsService.createProductListFromCodeList(this.market.codici).subscribe((productList: Product[]) =>{      
          for (var key in productList) {
            productElementArray.push({code: productList[key].FDI_0001, description: productList[key].FDI_0004});
          }
          
        });;
        return productElementArray;
      });
  }

  goBack(): void {
    this.location.back();
  }

  create(): void{ 
    this.market.codici=this.productTableComponent.createProductCodesStringArray();
    this.marketService.addMarket(this.market).subscribe(market => {this.location.back()});
  }


  update(): void{

    this.market.codici=this.productTableComponent.createProductCodesStringArray();
    this.marketService.updateMarket(this.market).subscribe(market => {
      this.showProgressBar = true;
      var params = new HttpParams();
      params=params.append("marketname",this.market.name);    
      this.welfinityscriptsService.WIM_createMarkets(params).subscribe(data => {this.requetResult =  data['result'];   console.log('result ' + this.requetResult);
      this.showProgressBar = false;
      this.location.back();    
    });
      
    });;

    
  }
  
}


export interface ProductElement {
  code: string;
  description: string;
 
}

