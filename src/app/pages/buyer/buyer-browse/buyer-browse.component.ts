import { Component, OnInit } from '@angular/core';
import { Buyer, BUYER_DATA } from 'app/app.model';
import { AppService } from 'app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectMaterialComponent } from './select-material/select-material.component';

@Component({
  selector: 'wm-buyer-browse',
  templateUrl: './buyer-browse.component.html',
  styleUrls: ['./buyer-browse.component.scss']
})
export class BuyerBrowseComponent implements OnInit {
  public browseBy: string = 'bySeller';
  public filteredSellers: any[] = [];
  public materialFilters = {};

  constructor(public appServ: AppService, public dialog: MatDialog) {}

  ngOnInit() {
    this.filterSellersByMaterials({});
  }

  public onBrowseByChange(value) {
    value == 'byMaterial' ? this.openSelectMaterialDialog() : this.filterSellersByMaterials({});
  }

  openSelectMaterialDialog(): void {
    const dialogRef = this.dialog.open(SelectMaterialComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.applyBrowseByMaterialFilters(result);
    });
  }

  applyBrowseByMaterialFilters(filters) {
    this.materialFilters = filters;
    this.appServ.allItems.length > 0
      ? this.filterSellersByMaterials(filters)
      : this.appServ.getAllItems().subscribe(data => {
          this.appServ.allItems = data;
          this.filterSellersByMaterials(filters);
        });
  }

  filterSellersByMaterials(filters) {
    let allSellers = [...this.appServ.allSellers];
    if (filters && filters.material && filters.quantity) {
      let materialFilteredSellerItems = this.appServ.allItems.filter(item => {
        return item.details[filters.material] && item.details[filters.material].quantity > 0;
      });
      let materialFilteredSellerIds = materialFilteredSellerItems.map(i => i.sellerId);

      let materialAvailableSellerIds = materialFilteredSellerItems
        .filter(item => item.details[filters.material].quantity >= filters.quantity)
        .map(i => i.sellerId);

      this.filteredSellers = allSellers.filter(s => materialFilteredSellerIds.includes(s.id));
      this.filteredSellers.forEach(seller => {
        seller.availability = materialAvailableSellerIds.includes(seller.id) ? 'yes' : 'no';
      });
    } else {
      allSellers.forEach(seller => {
        seller.availability = undefined;
      });
      this.filteredSellers = allSellers;
    }
  }
}
