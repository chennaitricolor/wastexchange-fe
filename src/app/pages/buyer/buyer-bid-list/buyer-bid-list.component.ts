import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'app/app.service';
import { Bid, Buyer } from 'app/app.model';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(public appServ: AppService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.listenToRouteParams();
  }

  /**
   * @description listen to the route params for changes in buyer id
   */
  private listenToRouteParams() {
    this.routeParamSubscr = this.route.paramMap.subscribe(params => {
      let _buyerId: number = +params.get('id');
      if (this.checkIfNewBuyer(_buyerId) && !this.checkIfRedirectionRequired(_buyerId)) {
        // Check if data refresh is required
        this.setCurrentBuyer(_buyerId);
        this.initializeBidList(_buyerId);
      }
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
      this.bids = data;
      this.bids.forEach(bid => {
        bid.seller = this.appServ.allSellers.find(seller => seller.id == bid.sellerId); // Set the seller details in the bid object
      });
    });
  }

  /**
   * @description check if a new buyer data is loaded
   * @param buyerId the new buyer id
   */
  private checkIfNewBuyer(buyerId: number) {
    return !this.buyer || this.buyer.id !== buyerId;
  }

  /**
   * @description check for redirection in case that a non-admin tries to access another buyer
   * @param buyerId the buyer id requested
   */
  private checkIfRedirectionRequired(buyerId): boolean {
    if (buyerId !== this.appServ.loggedInUserInfo['id'] && this.appServ.loggedInUserInfo['persona'] !== 'admin') {
      this.router.navigate(['buyer', this.appServ.loggedInUserInfo['id'], 'bid-list']);
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.routeParamSubscr.unsubscribe();
  }
}
