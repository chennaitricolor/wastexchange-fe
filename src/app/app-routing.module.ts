import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerBidComponent } from './pages/buyer/buyer-bid/buyer-bid.component';
import { BuyerBidListComponent } from './pages/buyer/buyer-bid-list/buyer-bid-list.component';
import { SellerBidListComponent } from './pages/seller/seller-bid-list/seller-bid-list.component';
import { BuyerBrowseComponent } from './pages/buyer/buyer-browse/buyer-browse.component';
import { LandingComponent } from './pages/common/landing/landing.component';
import { InfoComponent } from './shared/components/info/info.component';
import { SellerListComponent } from './pages/admin/seller-list/seller-list.component';

import { AuthGuard, UserSessionDataResolver, UserDataResolver } from './app.service';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    resolve: [UserSessionDataResolver, UserDataResolver]
  },
  {
    path: 'buyer/:id/browse',
    component: BuyerBrowseComponent,
    resolve: [UserSessionDataResolver, UserDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: 'buyer/:id/bid',
    component: BuyerBidComponent,
    resolve: [UserSessionDataResolver, UserDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: 'buyer/:id/bid-list',
    component: BuyerBidListComponent,
    resolve: [UserSessionDataResolver, UserDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: 'seller/:id/bid-list',
    component: SellerBidListComponent,
    resolve: [UserSessionDataResolver, UserDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/seller-list',
    component: SellerListComponent,
    resolve: [UserSessionDataResolver, UserDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: 'info/:page',
    component: InfoComponent
  },
  {
    path: '**',
    component: LandingComponent,
    resolve: [UserSessionDataResolver, UserDataResolver]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
