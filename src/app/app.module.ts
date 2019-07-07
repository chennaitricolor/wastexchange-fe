import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { AgmCoreModule } from "@agm/core";
import { MapComponent } from "./shared/components/map/map.component";
import { MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [AppComponent, HomeComponent, MapComponent],
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
