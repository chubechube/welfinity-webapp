import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketDetailComponent } from './market-detail/market-detail.component';
import { MarketsComponent } from './markets/markets.component';
import { MessagesComponent } from './messages/messages.component';
import { MarketSearchComponent } from './market-search/market-search.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';

//Services
import { MarketService } from './Services/market.service';
import { MessageService } from './Services/message.service';
import {WelfinityscriptsService} from './Services/welfinityscripts.service';
import {ProductsService} from './Services/products.service';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';


import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatIconRegistry,
  MatProgressBarModule,
  MatCardModule,
  MatNativeDateModule,
  MatInputModule
  
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
    MatInputModule
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
    MatInputModule
  ],



})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MarketsComponent,
    MarketDetailComponent,
    MessagesComponent,
    MarketSearchComponent,
    AggregationsComponent,
    ProductDetailComponent,
    ProductSearchComponent
  ],
  entryComponents: [DashboardComponent],
  providers: [ MarketService, MessageService ,WelfinityscriptsService,ProductsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }



