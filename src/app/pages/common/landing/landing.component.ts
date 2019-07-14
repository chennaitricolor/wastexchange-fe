import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "wm-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public appServ: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.redirectUser();
  }

  redirectUser() {
    if (this.appServ.isUserLoggedIn) {
      let [persona, userId] = [
        this.appServ.loggedInUserInfo["persona"],
        this.appServ.loggedInUserInfo["id"]
      ];
      if (persona == "seller") {
        this.router.navigate(["seller", userId, "bid-list"]);
      } else if (persona == "buyer") {
        this.router.navigate(["buyer", userId, "browse"]);
      }
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.redirectUser();
    });
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
