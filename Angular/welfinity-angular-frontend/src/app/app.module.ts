import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketDetailComponent } from './market-detail/market-detail.component';
import { MarketsComponent } from './markets/markets.component';
import { MessagesComponent } from './messages/messages.component';
import { MarketSearchComponent } from './market-search/market-search.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { LoginComponent }         from './Login/login.component';

//Services
import { MarketService } from './Services/market.service';
import { MessageService } from './Services/message.service';
import { WelfinityscriptsService } from './Services/welfinityscripts.service';
import  {ProductsService } from './Services/products.service';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';

//Interceptors
import { TokenInterceptor } from './Interceptors/token.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';


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
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatGridListModule
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
    MatGridListModule
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
    FlexLayoutModule
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



