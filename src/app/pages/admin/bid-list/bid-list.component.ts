import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'app/app.service';
import { Bid, Buyer } from 'app/app.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wm-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit, OnDestroy {
  public bids: Bid[] = [];

  constructor(public appServ: AppService, private route: ActivatedRoute) {
    this.appServ.hidePageActions = true;
  }

  ngOnInit() {
    this.initializeBidList();
  }

  private initializeBidList() {
    this.appServ.getAllBids().subscribe(data => {
      this.bids = data.sort((a, b) => b.id - a.id)
      this.bids.forEach(bid => {
        bid.seller = this.appServ.allSellers.find(seller => seller.id == bid.sellerId); // Set the seller details in the bid object
        bid.buyer = this.appServ.allBuyers.find(buyer => buyer.id == bid.buyerId); // Set the buyer details in the bid object
      });
    });
  }

  ngOnDestroy() {
    this.appServ.hidePageActions = false;
  }
}
