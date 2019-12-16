import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MATERIALS } from 'app/app.model';
import { AppService } from 'app/app.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

const PER_PAGE_COUNT = 12;
@Component({
  selector: 'wm-bid-list-table',
  templateUrl: './bid-list-table.component.html',
  styleUrls: ['./bid-list-table.component.scss']
})
export class BidListTableComponent implements OnInit {
  @Input() bids: any[];
  @Input() user: any;
  @Input() showBuyer: boolean;
  @Input() showSeller: boolean;
  @Output() bidApproved = new EventEmitter();

  public currentPage = 1;
  public perPageCount = PER_PAGE_COUNT;
  public materials = MATERIALS;
  public paginatedBids: any[] = [];
  constructor(public appServ: AppService) {}

  ngOnInit() {
    this.paginatedBids = this.bids.slice(0, this.perPageCount);
  }

  updateStatusOfBid(bid, status) {
    delete bid.seller;
    delete bid.buyer;
    bid.status = status;
    this.appServ.updateBid(bid).subscribe(() => {
      this.appServ.openSnackBar(`Bid updated successfully`, 'DISMISS');
      bid.status == 'approved' && this.bidApproved.emit(bid.sellerId);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedBids = this.bids.slice(startItem, endItem);
  }
}
