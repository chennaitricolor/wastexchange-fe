import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component"


@Component({
  selector: 'wm-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  };

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
