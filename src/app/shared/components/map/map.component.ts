import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/app.service";
import { MATERIALS } from "./../../../app.model";

@Component({
  selector: "wm-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() sellers: any[] = [];
  public materials = MATERIALS;

  lat: number = 12.9801;
  long: number = 80.218;
  zoom: number = 12;

  constructor(public appServ: AppService) {}

  ngOnInit() {}

  public onMarkerHover(index) {
    !this.sellers[index].details &&
      this.appServ
        .getSellerItems(this.sellers[index].id)
        .subscribe(response => {
          this.sellers[index].details = this.setDefaultMaterialData(
            response || { details: {} }
          );
        });
  }

  private setDefaultMaterialData(sellerItem) {
    Object.keys(this.materials).forEach(material => {
      !sellerItem.details[material] &&
        (sellerItem.details[material] = { quantity: 0, cost: 0, bid: 0 });
    });
    return sellerItem.details;
  }
}
