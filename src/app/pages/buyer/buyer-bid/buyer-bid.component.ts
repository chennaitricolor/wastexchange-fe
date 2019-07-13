import { Component, OnInit } from "@angular/core";
import { Buyer, BUYER_DATA, Seller, SELLER_DATA } from "./../../../app.model";
import { AppService } from "./../../../app.service";
import { Bid, MATERIALS, SellerItem } from "./../../../app.model";
import { BidListTableComponent } from "../../common/bid-list-table/bid-list-table.component";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

@Component({
  selector: "wm-buyer-bid",
  templateUrl: "./buyer-bid.component.html",
  styleUrls: ["./buyer-bid.component.scss"]
})
export class BuyerBidComponent implements OnInit {
  public buyer: Buyer = BUYER_DATA[0];
  public seller: Seller = SELLER_DATA[0];
  public materials = MATERIALS;
  public sellerItem: SellerItem;
  public bid: Bid;
  public bidId: number;
  public canRaiseBid: boolean = false;

  constructor(
    private appServ: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      this.bidId = +params["bidId"];
    });
  }

  ngOnInit() {
    this.appServ.getSellerItems(6).subscribe(data => {
      if (this.bidId) {
        this.appServ.getBid(this.bidId).subscribe(response => {
          this.bid = response;
          this.sellerItem = data;
          this.setDefaultMaterialData(this.sellerItem);
          this.canRaiseBid = true;
        });
      } else {
        this.sellerItem = data;
        this.setDefaultMaterialData(this.sellerItem);
        this.canRaiseBid = true;
      }
    });
  }

  private setDefaultMaterialData(sellerItem) {
    !this.bid &&
      (this.bid = {
        buyerId: this.buyer.id,
        sellerId: 6,
        details: {},
        status: "pending",
        totalBid: 0,
        pDate: "12/07/2019",
        pTime: "13:46:50.304"
      });

    Object.keys(this.materials).forEach(material => {
      !sellerItem.details[material] &&
        (sellerItem.details[material] = {
          quantity: 0,
          bidQuantity: 0,
          cost: 0,
          bidCost: 0
        });

      !this.bid.details[material] &&
        (this.bid.details[material] = {
          quantity: sellerItem.details[material].quantity || 0,
          bidQuantity: 0,
          cost: sellerItem.details[material].cost || 0,
          bidCost: 0
        });
    });
  }

  public createOrUpdateBid() {
    let observable = this.bid.id
      ? this.appServ.updateBid(this.bid)
      : this.appServ.createBid(this.bid);
    observable.subscribe(response => {
      this.router.navigate(["buyer/1/bid-list"]);
    });
  }
}
