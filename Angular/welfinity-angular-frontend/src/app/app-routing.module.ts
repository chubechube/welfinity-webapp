import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketsComponent } from './markets/markets.component';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { MarketDetailComponent } from './market-detail/market-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:name', component: MarketDetailComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'aggregations', component: AggregationsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
