import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppService } from "src/app/app.service";

@Component({
  selector: "wm-seller-list",
  templateUrl: "./seller-list.component.html",
  styleUrls: ["./seller-list.component.scss"]
})
export class SellerListComponent {
  constructor(public appServ: AppService) {}
}
