import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { environment } from "./../environments/environment";

import { ApiLoaderInterceptor } from "./http-interceptors/api-loader-interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./pages/common/landing/landing.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  ButtonsModule,
  TimepickerModule,
  BsDatepickerModule
} from "ngx-bootstrap";

import { AgmCoreModule } from "@agm/core";
import { AgmJsMarkerClustererModule } from "@agm/js-marker-clusterer";

import { MapComponent } from "./shared/components/map/map.component";
import {
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
} from "@angular/material";

import { LayoutModule } from "@angular/cdk/layout";

import { BuyerBidComponent } from "./pages/buyer/buyer-bid/buyer-bid.component";
import { BuyerBidListComponent } from "./pages/buyer/buyer-bid-list/buyer-bid-list.component";
import { SellerBidListComponent } from "./pages/seller/seller-bid-list/seller-bid-list.component";
import { BuyerBrowseComponent } from "./pages/buyer/buyer-browse/buyer-browse.component";
import { PageActionsComponent } from "./shared/components/page-actions/page-actions.component";
import { BidListTableComponent } from "./pages/common/bid-list-table/bid-list-table.component";
import { LoginComponent } from "./pages/common/landing/login/login.component";
import { SignUpComponent } from "./pages/common/landing/sign-up/sign-up.component";

import { WmMaxDirective } from "./directives/wm-max-validator.directive";
import { WmMinDirective } from "./directives/wm-min-validator.directive";

import { FilterListPipe } from "./pipes/filter-list.pipe";

import {
  AppService,
  AuthGuard,
  UserSessionDataResolver,
  UserDataResolver
} from "./app.service";
import { SidenavMenuComponent } from "./shared/components/sidenav-menu/sidenav-menu.component";
import { InfoComponent } from "./shared/components/info/info.component";
import { SellerListComponent } from "./pages/admin/seller-list/seller-list.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MapComponent,
    BuyerBidComponent,
    BuyerBidListComponent,
    BuyerBrowseComponent,
    SellerBidListComponent,
    PageActionsComponent,
    BidListTableComponent,
    LoginComponent,
    SignUpComponent,
    WmMaxDirective,
    WmMinDirective,
    SidenavMenuComponent,
    InfoComponent,
    SellerListComponent,
    FilterListPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AgmJsMarkerClustererModule
  ],
  entryComponents: [LoginComponent, SignUpComponent],
  providers: [
    AppService,
    AuthGuard,
    UserSessionDataResolver,
    UserDataResolver,
    { provide: HTTP_INTERCEPTORS, useClass: ApiLoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
