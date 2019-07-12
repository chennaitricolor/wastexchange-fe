import { Component, OnInit } from "@angular/core";
import { Buyer, BUYER_DATA, Seller, SELLER_DATA } from "./../../../app.model";
import { AppService } from "./../../../app.service";
import { Bid, MATERIALS, SellerItem } from "./../../../app.model";

@Component({
  selector: "wm-seller-bid-list",
  templateUrl: "./seller-bid-list.component.html",
  styleUrls: ["./seller-bid-list.component.scss"]
})
export class SellerBidListComponent implements OnInit {
  public buyer: Buyer = BUYER_DATA[0];
  public seller: Seller = SELLER_DATA[0];
  public bids: Bid[] = [];
  public materials = MATERIALS;
  public sellerItem: SellerItem;
  public isSellerDataEditable: boolean = false;

  constructor(private appServ: AppService) {}

  ngOnInit() {
    this.appServ.getBids().subscribe(data => {
      this.bids = data;
    });

    this.appServ.getSellerItems(6).subscribe(data => {
      this.sellerItem = data;
      this.setDefaultMaterialData(this.sellerItem);
    });
  }

  private setDefaultMaterialData(sellerItem) {
    Object.keys(this.materials).forEach(material => {
      !sellerItem.details[material] &&
        (sellerItem.details[material] = { quantity: 0, cost: 0, bid: 0 });
    });
  }

  public updateSellerItem() {
    this.appServ.updateSellerItem(this.sellerItem).subscribe((response) => {
      this.sellerItem.details = response.data.details;
      this.isSellerDataEditable = false;
    })
  }
}
