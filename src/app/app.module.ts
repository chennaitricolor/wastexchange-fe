import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./pages/common/landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { AgmCoreModule } from "@agm/core";
import { MapComponent } from "./shared/components/map/map.component";
import { MatButtonModule } from "@angular/material";
import { BuyerBidComponent } from "./pages/buyer/buyer-bid/buyer-bid.component";
import { BuyerBidListComponent } from "./pages/buyer/buyer-bid-list/buyer-bid-list.component";
import { SellerBidListComponent } from "./pages/seller/seller-bid-list/seller-bid-list.component";
import { BuyerBrowseComponent } from "./pages/buyer/buyer-browse/buyer-browse.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MapComponent,
    BuyerBidComponent,
    BuyerBidListComponent,
    BuyerBrowseComponent,
    SellerBidListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB8NCphJh5-XfQFXb2EcrKO922PgoLt-Aw"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
