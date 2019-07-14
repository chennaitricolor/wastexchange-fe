import { Component, OnInit, Input } from "@angular/core";
import { MATERIALS } from "./../../../app.model";
import { AppService } from "src/app/app.service";
@Component({
  selector: "wm-bid-list-table",
  templateUrl: "./bid-list-table.component.html",
  styleUrls: ["./bid-list-table.component.scss"]
})
export class BidListTableComponent implements OnInit {
  @Input() bids: any[];

  public materials = MATERIALS;

  constructor(public appServ: AppService) {}

  ngOnInit() {
    
  }

  updateStatusOfBid(bid, status) {
    delete bid.seller;
    delete bid.buyer;
    bid.status = status;
    this.appServ.updateBid(bid).subscribe(data => {});
  }
}
