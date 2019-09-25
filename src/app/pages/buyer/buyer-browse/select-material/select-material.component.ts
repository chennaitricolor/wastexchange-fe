import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { MATERIALS } from 'app/app.model';

@Component({
  selector: 'wm-select-material',
  templateUrl: './select-material.component.html',
  styleUrls: ['./select-material.component.scss']
})
export class SelectMaterialComponent implements OnInit {
  public material: string;
  public quantity: number;
  public materials = MATERIALS;
  public materialOptions = [];

  constructor(public dialogRef: MatDialogRef<SelectMaterialComponent>, public appServ: AppService, private router: Router) {}

  ngOnInit() {
    this.getItemDetailsAndProcessMaterials();
  }

  private getItemDetailsAndProcessMaterials() {
    this.appServ.allItems.length > 0
      ? this.processMaterials()
      : this.appServ.getAllItems().subscribe(data => {
          this.appServ.allItems = data;
          this.processMaterials();
        });
  }

  private processMaterials() {
    let sumOfMaterialsQuantity = material => {
      return this.appServ.allItems.reduce((acc, obj) => {
        return acc + (obj.details[material] ? +obj.details[material].quantity || 0 : 0);
      }, 0);
    };

    Object.keys(this.materials).forEach(materialKey => {
      this.materialOptions.push({
        key: materialKey,
        value: this.materials[materialKey],
        totalQuantity: sumOfMaterialsQuantity(materialKey)
      });
    });
  }

  onCancel(): void {
    this.closeLoginDialog();
  }

  closeLoginDialog(result = {}) {
    this.dialogRef.close(result);
  }

  applyFilters() {
    this.dialogRef.close({ material: this.material, quantity: this.quantity });
  }
}
