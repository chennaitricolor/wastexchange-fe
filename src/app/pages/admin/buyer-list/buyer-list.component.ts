import { Component } from '@angular/core';
import { AppService } from 'app/app.service';
import { Buyer } from 'app/app.model';

@Component({
  selector: 'wm-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent {
  public searchText: string;
  constructor(public appServ: AppService) {}

  /**
   * @description approve a buyer
   * @param buyer the buyer to approve
   */
  public approveBuyer(buyer: Buyer) {
    this.appServ.approveUser(buyer.id).subscribe(
      response => {
        buyer.approved = true;
        this.appServ.openSnackBar(`Buyer approved successfully`, 'DISMISS');
      },
      () => {
        this.appServ.openSnackBar(`Oops! Could not approve buyer`, 'DISMISS');
      }
    );
  }
}
