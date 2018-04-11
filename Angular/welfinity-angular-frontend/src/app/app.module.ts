import { NgModule }                         from '@angular/core';
import { CdkTableModule }                   from '@angular/cdk/table';
import { FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { DomSanitizer }                     from '@angular/platform-browser';


import { AppComponent }                     from './app.component';
import { DashboardComponent }               from './dashboard/dashboard.component';
import { MarketDetailComponent }            from './market-detail/market-detail.component';
import { MarketsComponent }                 from './markets/markets.component';
import { MessagesComponent }                from './messages/messages.component';
import { MarketSearchComponent }            from './market-search/market-search.component';
import { AggregationsComponent }            from './aggregations/aggregations.component';
import { AggregationMarketComponent }       from './aggregation-markets/aggregation-market.component';
import { AggregationTabsComponent }         from './aggregation-tabs/aggregation-tabs.component';
import { ProductDetailComponent }           from './product-detail/product-detail.component';
import { ProductSearchComponent }           from './product-search/product-search.component';
import { LoginComponent }                   from './Login/login.component';
import { FlexLayoutModule }                 from "@angular/flex-layout";

//Services
import { MarketService }                    from './Services/market.service';
import { MessageService }                   from './Services/message.service';
import { WelfinityscriptsService }          from './Services/welfinityscripts.service';
import  {ProductsService }                  from './Services/products.service';
import { AuthService }                      from './Services/auth.service';
import { AuthGuardService }                 from './Services/auth-guard.service';

//Interceptors and Sercices
import { TokenInterceptor }                 from './Interceptors/token.interceptor';
import { HTTP_INTERCEPTORS }                from '@angular/common/http';
import { HttpClientModule }                 from '@angular/common/http';
import { AppRoutingModule }                 from './/app-routing.module';
import { HttpModule }                       from '@angular/http';

//Modules
import { BrowserModule }                    from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { MatDatepickerModule }              from '@angular/material/datepicker';
import { MatFormFieldModule }               from '@angular/material/form-field';

//Material Modules

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatIconRegistry,
  MatProgressBarModule,
  MatCardModule,
  MatNativeDateModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatGridListModule,
  MatTabsModule
} from '@angular/material';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule
  ],



})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MarketsComponent,
    MarketDetailComponent,
    MessagesComponent,
    MarketSearchComponent,
    AggregationsComponent,
    AggregationTabsComponent,
    AggregationMarketComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    LoginComponent
  ],
  entryComponents: [DashboardComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, MarketService, MessageService ,WelfinityscriptsService,ProductsService,AuthService,AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }



