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
    Object.keys(this.materials).forEach(materialKey => {
      this.materialOptions.push({ key: materialKey, value: this.materials[materialKey] });
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
