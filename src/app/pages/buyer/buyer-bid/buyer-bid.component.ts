import { Component, OnInit } from "@angular/core";
import { Buyer, BUYER_DATA, Seller, SELLER_DATA } from "./../../../app.model";
import { AppService } from "./../../../app.service";
import { Bid, MATERIALS, SellerItem } from "./../../../app.model";
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
  public sellerId: number;
  public canRaiseBid: boolean = false;

  constructor(
    private appServ: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      this.bidId = +params["bidId"];
      this.sellerId = +params["sellerId"];
    });
  }

  ngOnInit() {
    this.appServ.getSellerItems(this.sellerId).subscribe(data => {
      if (this.bidId) {
        this.appServ.getBid(this.bidId).subscribe(response => {
          this.bid = response;
          this.sellerItem = data;
          this.setDefaultMaterialData(this.sellerItem || { details: {} });
          this.canRaiseBid = true;
        });
      } else {
        this.sellerItem = data;
        this.setDefaultMaterialData(this.sellerItem || { details: {} });
        this.canRaiseBid = true;
      }
    });
  }

  private setDefaultMaterialData(sellerItem) {
    !this.bid &&
      (this.bid = {
        buyerId: this.appServ.loggedInUserInfo['id'],
        sellerId: this.sellerId,
        details: {},
        status: "pending",
        totalBid: 0,
        contactName: "",
        pDate: "12/07/2019",
        pTime: "13:46:50.304"
      });

    this.appServ.setDefaultMaterialData(sellerItem);

    Object.keys(this.materials).forEach(material => {
      !this.bid.details[material] &&
        (this.bid.details[material] = {
          bidQuantity: 0,
          bidCost: 0
        });
    });
  }

  public createOrUpdateBid() {
    let observable = this.bid.id
      ? this.appServ.updateBid(this.bid)
      : this.appServ.createBid(this.bid);
    observable.subscribe(response => {
      this.router.navigate([
        "buyer",
        this.appServ.loggedInUserInfo["id"],
        "bid-list"
      ]);
    });
  }
}
