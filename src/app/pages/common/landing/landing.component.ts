import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wm-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  // public staticMapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x600&maptype=roadmap
  // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
  // &markers=color:red%7Clabel:C%7C40.718217,-73.998284
  // &key=${environment.googleMapsApiKey}`;

  constructor(public dialog: MatDialog, public appServ: AppService, private router: Router) {}

  ngOnInit() {
    this.redirectUser();
  }

  redirectUser() {
    if (this.appServ.isUserLoggedIn) {
      let [persona, userId] = [this.appServ.loggedInUserInfo['persona'], this.appServ.loggedInUserInfo['id']];
      let params = {
        admin: ['admin', 'buyer-list'],
        seller: ['seller', userId, 'bid-list'],
        buyer: ['buyer', userId, 'browse']
      };
      this.router.navigate(params[persona]);
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.redirectUser();
    });
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.openLoginDialog();
    });
  }
}
