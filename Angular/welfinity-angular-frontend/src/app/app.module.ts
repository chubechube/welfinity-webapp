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

//Services
import { MarketService } from './Services/market.service';
import { MessageService } from './Services/message.service';
import {WelfinityscriptsService} from './Services/welfinityscripts.service';
import {ProductsService} from './Services/products.service';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';


import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatIconRegistry,
  MatProgressBarModule,
  MatCardModule
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
    MatCardModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MarketsComponent,
    MarketDetailComponent,
    MessagesComponent,
    MarketSearchComponent
  ],
  entryComponents: [DashboardComponent],
  providers: [ MarketService, MessageService ,WelfinityscriptsService,ProductsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }



