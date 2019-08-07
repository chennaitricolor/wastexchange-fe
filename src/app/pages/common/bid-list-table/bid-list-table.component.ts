import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MATERIALS } from 'app/app.model';
import { AppService } from 'app/app.service';
@Component({
  selector: 'wm-bid-list-table',
  templateUrl: './bid-list-table.component.html',
  styleUrls: ['./bid-list-table.component.scss']
})
export class BidListTableComponent implements OnInit {
  @Input() bids: any[];
  @Input() user: any;
  @Output() bidApproved = new EventEmitter();

  public materials = MATERIALS;

  constructor(public appServ: AppService) {}

  ngOnInit() {}

  updateStatusOfBid(bid, status) {
    delete bid.seller;
    delete bid.buyer;
    bid.status = status;
    this.appServ.updateBid(bid).subscribe(() => {
      this.appServ.openSnackBar(`Bid updated successfully`, 'DISMISS');
      bid.status == 'approved' && this.bidApproved.emit(bid.sellerId);
    });
  }
}
