import { Component, OnInit } from "@angular/core";
import { Buyer, Seller } from "./../../../app.model";
import { AppService } from "./../../../app.service";
import { Bid } from "./../../../app.model";

@Component({
  selector: "wm-buyer-bid-list",
  templateUrl: "./buyer-bid-list.component.html",
  styleUrls: ["./buyer-bid-list.component.scss"]
})
export class BuyerBidListComponent implements OnInit {
  public bids: Bid[] = [];

  constructor(private appServ: AppService) {}

  ngOnInit() {
    this.appServ.getBidsForBuyer(this.appServ.loggedInUserInfo['id']).subscribe(data => {
      this.bids = data;
      this.bids.forEach(bid => {
        bid.seller = this.appServ.allSellers.filter(
          seller => (seller.id == bid.sellerId)
        )[0];
      });
    });
  }
}
