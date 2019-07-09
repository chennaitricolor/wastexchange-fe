import { Component, OnInit, Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'wm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}

