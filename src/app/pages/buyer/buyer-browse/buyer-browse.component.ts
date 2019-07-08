import { Component, OnInit } from "@angular/core";
import { Buyer, BUYER_DATA } from "./../../../app.model";

@Component({
  selector: "wm-buyer-browse",
  templateUrl: "./buyer-browse.component.html",
  styleUrls: ["./buyer-browse.component.scss"]
})
export class BuyerBrowseComponent implements OnInit {
  public buyer: Buyer = BUYER_DATA[0];
  public browseBy: string = 'bySeller';

  constructor() {

  }

  ngOnInit() {}
}
