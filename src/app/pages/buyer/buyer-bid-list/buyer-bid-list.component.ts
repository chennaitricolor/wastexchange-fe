import { Component, OnInit } from '@angular/core';
import { Buyer, BUYER_DATA, Seller, SELLER_DATA } from "./../../../app.model";

@Component({
  selector: 'wm-buyer-bid-list',
  templateUrl: './buyer-bid-list.component.html',
  styleUrls: ['./buyer-bid-list.component.scss']
})
export class BuyerBidListComponent implements OnInit {
  public buyer: Buyer = BUYER_DATA[0];
  public seller: Seller = SELLER_DATA[0];

  constructor() { }

  ngOnInit() {
  }

}
