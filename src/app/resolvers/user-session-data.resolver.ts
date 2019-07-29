import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppService } from 'app/app.service';

@Injectable()
export class UserSessionDataResolver implements Resolve<any> {
  constructor(public appServ: AppService, private rtr: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.appServ.authorizeUser();
    this.appServ.userSessionData = this.appServ.getUserSessionDataFromSession();

    return new Promise((resolve, reject) => {
      this.appServ.isUserLoggedIn && !this.appServ.loggedInUserInfo
        ? this.appServ.getMe().subscribe(response => {
            this.appServ.loggedInUserInfo = response;
            resolve(true);
          })
        : resolve(true);
    });
  }
}
