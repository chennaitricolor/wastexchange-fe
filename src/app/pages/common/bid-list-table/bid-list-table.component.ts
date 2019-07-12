import { Component, OnInit, Input } from '@angular/core';
import { MATERIALS } from "./../../../app.model";
@Component({
  selector: 'wm-bid-list-table',
  templateUrl: './bid-list-table.component.html',
  styleUrls: ['./bid-list-table.component.scss']
})
export class BidListTableComponent implements OnInit {

  @Input() bids:any[];

  public materials2 = MATERIALS;

  constructor() { }

  ngOnInit() {
  }

}
