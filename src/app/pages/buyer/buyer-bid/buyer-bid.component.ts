import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Bid, MATERIALS, SellerItem } from 'app/app.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'wm-buyer-bid',
  templateUrl: './buyer-bid.component.html',
  styleUrls: ['./buyer-bid.component.scss']
})
export class BuyerBidComponent implements OnInit {
  public materials = MATERIALS;
  public sellerItem: SellerItem;
  public bid: Bid;
  public bidId: number;
  public sellerId: number;
  public sellerName: string;
  public canRaiseBid: boolean = false;

  constructor(public appServ: AppService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      this.bidId = +params['bidId'];
      this.sellerId = +params['sellerId'];
    });
  }

  ngOnInit() {
    this.sellerName = this.appServ.allSellers.filter(user => user.id == this.sellerId)[0].name;
    let onBid = data => {
      this.sellerItem = data;
      this.setDefaultMaterialData();
      this.canRaiseBid = true;
    };
    this.appServ.getSellerItems(this.sellerId).subscribe(data => {
      this.bidId
        ? this.appServ.getBidById(this.bidId).subscribe(response => {
            this.bid = response;
            onBid(data);
          })
        : onBid(data);
    });
  }

  private setDefaultMaterialData() {
    !this.bid &&
      (this.bid = {
        buyerId: this.appServ.loggedInUserInfo['id'],
        sellerId: this.sellerId,
        details: {},
        status: 'pending',
        totalBid: 0,
        contactName: ''
      });

    this.sellerItem = this.appServ.setDefaultMaterialData(this.sellerItem);

    Object.keys(this.materials).forEach(material => {
      !this.bid.details[material] &&
        (this.bid.details[material] = {
          bidQuantity: 0,
          bidCost: 0
        });
    });
  }

  public calculateTotalBid() {
    let sum = 0;
    Object.keys(this.bid.details).forEach(detail => {
      sum += this.bid.details[detail].bidCost * this.bid.details[detail].bidQuantity;
    });
    this.bid.totalBid = sum;
  }

  public createOrUpdateBid() {
    let action = this.bid.id ? 'updated' : 'raised';
    let observable = this.bid.id ? this.appServ.updateBid(this.bid) : this.appServ.createBid(this.bid);
    observable.subscribe(response => {
      this.appServ.openSnackBar(`Bid ${action} successfully`, 'DISMISS');
      this.router.navigate(['buyer', this.appServ.loggedInUserInfo['id'], 'bid-list']);
    });
  }
}
