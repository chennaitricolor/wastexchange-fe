import { Component, OnInit, Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: "wm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
