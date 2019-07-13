import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BuyerBidComponent } from "./pages/buyer/buyer-bid/buyer-bid.component";
import { BuyerBidListComponent } from "./pages/buyer/buyer-bid-list/buyer-bid-list.component";
import { SellerBidListComponent } from "./pages/seller/seller-bid-list/seller-bid-list.component";
import { BuyerBrowseComponent } from "./pages/buyer/buyer-browse/buyer-browse.component";
import { LandingComponent } from "./pages/common/landing/landing.component";
import { AuthGuard, UserSessionDataResolver } from "./app.service";

const routes: Routes = [
  { path: "", component: LandingComponent, resolve: [UserSessionDataResolver] },
  {
    path: "buyer/:id/browse",
    component: BuyerBrowseComponent,
    resolve: [UserSessionDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: "buyer/:id/bid",
    component: BuyerBidComponent,
    resolve: [UserSessionDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: "buyer/:id/bid-list",
    component: BuyerBidListComponent,
    resolve: [UserSessionDataResolver],
    canActivate: [AuthGuard]
  },
  {
    path: "seller/:id/bid-list",
    component: SellerBidListComponent,
    resolve: [UserSessionDataResolver],
    canActivate: [AuthGuard]
  },
  { path: "**", component: LandingComponent, resolve: [UserSessionDataResolver] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
