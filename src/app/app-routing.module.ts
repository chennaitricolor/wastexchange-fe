import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BuyerBidComponent } from "./pages/buyer/buyer-bid/buyer-bid.component";
import { BuyerBidListComponent } from "./pages/buyer/buyer-bid-list/buyer-bid-list.component";
import { SellerBidListComponent } from "./pages/seller/seller-bid-list/seller-bid-list.component";
import { BuyerBrowseComponent } from "./pages/buyer/buyer-browse/buyer-browse.component";
import { LandingComponent } from "./pages/common/landing/landing.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "**", component: LandingComponent },
  { path: "buyer/:id/browse", component: BuyerBrowseComponent },
  { path: "buyer/:id/bid", component: BuyerBidComponent },
  { path: "buyer/:id/bid-list", component: BuyerBidListComponent },
  { path: "seller/:id/bid-list", component: SellerBidListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
