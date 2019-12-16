import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'app/app.service';
import { Bid, Buyer } from 'app/app.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wm-buyer-bid-list',
  templateUrl: './buyer-bid-list.component.html',
  styleUrls: ['./buyer-bid-list.component.scss']
})
export class BuyerBidListComponent implements OnInit, OnDestroy {
  public bids: Bid[] = [];
  private routeParamSubscr: Subscription;
  public buyer: Buyer;
  public buyerId: number;

  constructor(public appServ: AppService, private route: ActivatedRoute) {
    this.fetchBuyerFromRouteParams();
  }

  ngOnInit() {
    this.setCurrentBuyer(this.buyerId);
    this.initializeBidList(this.buyerId);
  }

  /**
   * @description listen to the route params for changes in buyer id
   */
  private fetchBuyerFromRouteParams() {
    this.routeParamSubscr = this.route.params.subscribe((params: ParamMap) => {
      this.buyerId = params['id'];
    });
  }

  /**
   * @description set the current buyer bu id
   * @param buyerId the current buyer id
   */
  private setCurrentBuyer(buyerId: number) {
    this.buyer = this.appServ.allBuyers.find(buyer => buyer.id == buyerId);
  }

  /**
   * @description initialize the bid list for buyer
   * @param buyerId the buyer id
   */
  private initializeBidList(buyerId: number) {
    this.appServ.getBidsForBuyer(buyerId).subscribe(data => {
      this.bids = data.sort((a, b) => b.id - a.id)
      this.bids.forEach(bid => {
        bid.seller = this.appServ.allSellers.find(seller => seller.id == bid.sellerId); // Set the seller details in the bid object
      });
    });
  }

  ngOnDestroy(): void {
    this.routeParamSubscr.unsubscribe();
  }
}
