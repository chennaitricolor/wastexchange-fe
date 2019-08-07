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
}
