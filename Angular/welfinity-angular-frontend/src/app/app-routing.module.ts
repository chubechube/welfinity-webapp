import { NgModule } from '@angular/core';
import { RouterModule, Routes , CanActivate } from '@angular/router';

import { AuthGuardService as AuthGuard }  from './Services/auth-guard.service'
import { DashboardComponent }             from './dashboard/dashboard.component';
import { MarketsComponent }               from './markets/markets.component';
import { AggregationsComponent }          from './aggregations/aggregations.component';
import { AggregationTabsComponent}        from './aggregation-tabs/aggregation-tabs.component'
import { AggregationMarketComponent }       from './aggregation-markets/aggregation-market.component';
import { MarketDetailComponent }          from './market-detail/market-detail.component';
import { LoginComponent }                 from './Login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'market_detail/:name', component: MarketDetailComponent, canActivate: [AuthGuard]},
  { path: 'market_detail', component: MarketDetailComponent, canActivate: [AuthGuard]},
  { path: 'markets', component: MarketsComponent ,canActivate: [AuthGuard] },
  { path: 'aggregationstabs', component: AggregationTabsComponent,canActivate: [AuthGuard] }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
