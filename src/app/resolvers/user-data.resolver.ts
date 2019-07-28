
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from "@angular/router";
import { Injectable } from '@angular/core';
import { AppService } from 'app/app.service';

@Injectable()
export class UserDataResolver implements Resolve<any> {
    constructor(public appServ: AppService, private rtr: Router) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        this.appServ.userSessionData = this.appServ.getUserSessionDataFromSession();

        return new Promise((resolve, reject) => {
            this.appServ.allUsers.length
                ? resolve(true)
                : this.appServ.getAllUsersAndFilter().then(() => {
                    resolve(true);
                });
        });
    }
}