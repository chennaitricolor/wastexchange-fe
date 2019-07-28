import { Component, OnInit } from "@angular/core";
import { Buyer, BUYER_DATA, Seller, SELLER_DATA } from "./../../../app.model";
import { AppService } from "./../../../app.service";
import { Bid, MATERIALS, SellerItem } from "./../../../app.model";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

@Component({
  selector: 'wm-seller-bid-list',
  templateUrl: './seller-bid-list.component.html',
  styleUrls: ['./seller-bid-list.component.scss']
})
export class SellerBidListComponent implements OnInit {
  private sellerId: string;
  public seller: Seller;
  public bids: Bid[] = [];
  public materials = MATERIALS;
  public sellerItem: SellerItem;
  public isSellerDataEditable: boolean = false;

  constructor(
    public appServ: AppService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.sellerId = params["id"];
    });
  }

  ngOnInit() {
    this.seller = this.appServ.allSellers.filter(
      seller => seller.id == this.sellerId
    )[0];

    this.appServ.getBids().subscribe(data => {
      this.bids = data.filter(bid => bid.sellerId == +this.sellerId);
      this.bids.forEach(bid => {
        bid.buyer = this.appServ.allBuyers.filter(buyer => buyer.id == bid.buyerId)[0];
      });
    });

    this.getSellerItems();
  }

  public updateSellerItem() {
    this.appServ.updateSellerItem(this.sellerItem).subscribe(response => {
      this.sellerItem.details = response.data.details;
      this.isSellerDataEditable = false;
      this.appServ.openSnackBar(`Inventory updated successfully`, 'DISMISS');
    });
  }

  public getSellerItems() {
    this.appServ.getSellerItems(this.sellerId).subscribe(data => {
      this.sellerItem = data;
      this.appServ.setDefaultMaterialData(this.sellerItem || { details: {} });
    });
  }
}
