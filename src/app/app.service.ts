import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Bid, SellerItem, Seller } from "./app.model";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public isUserLoggedIn: boolean = false;
  public userSessionData: Object;
  public loggedInUserDetails: Object;

  constructor(private httpClient: HttpClient, private rtr: Router) {}

  public getBids(): Observable<Bid[]> {
    return this.httpClient.get<Bid[]>("/api/bids");
  }

  public getSellerItems(sellerId): Observable<SellerItem> {
    return this.httpClient.get<SellerItem>(`/api/seller/${sellerId}/items`);
  }

  public updateSellerItem(sellerItem: SellerItem) {
    return this.httpClient.put<any>(`/api/items/${sellerItem.id}`, sellerItem);
  }

  public createBid(bid: Bid) {
    return this.httpClient.post<any>(`/api/buyer/${bid.buyerId}/bids`, bid);
  }

  public loginUser(loginPayload: any): Observable<any> {
    return this.httpClient.post<any>("/api/users/login", loginPayload);
  }

  public getMe(): Observable<any> {
    let headers = { "x-access-token": this.getSessionValue("token") };
    return this.httpClient.get<any>("/api//users/me", { headers });
  }

  public authorizeUser() {
    this.userSessionData = this.getUserSessionDataFromSession();
    this.isUserLoggedIn =
      !!(Object.keys(this.userSessionData).length && this.userSessionData["auth"]);
  }

  public getUserSessionDataFromSession() {
    let _userSessionData = new Object();
    for (let _counter = 0; _counter < sessionStorage.length; _counter++) {
      _userSessionData[sessionStorage.key(_counter)] = sessionStorage.getItem(
        sessionStorage.key(_counter)
      );
    }
    return _userSessionData;
  }

  public clearSessionData() {
    sessionStorage.clear();
    this.userSessionData = new Object();
  }

  public forceLogoutUser() {
    this.clearSessionData();
    this.isUserLoggedIn = false;
    this.rtr.navigate([""]);
    // this.openSnackBar(
    //   "Your login is expired. Kindy login again.",
    //   "DISMISS",
    //   5000
    // );
  }

  public setSessionData(userSessionData: Object) {
    Object.keys(userSessionData).forEach(key => {
      sessionStorage.setItem(key, userSessionData[key]);
      sessionStorage.setItem("sessionCreatedTime", Date.now().toString());
    });
    this.userSessionData = userSessionData;
  }

  public getSessionValue(key: string) {
    return sessionStorage.getItem(key) || "";
  }
}

import { CanActivate } from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private appServ: AppService) {}
  canActivate(): boolean {
    this.appServ.authorizeUser();
    !this.appServ.isUserLoggedIn && this.appServ.forceLogoutUser();
    return this.appServ.isUserLoggedIn;
  }
}

import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserSessionDataResolver implements Resolve<any> {
  constructor(private appServ: AppService, private rtr: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('here')
    return new Promise((resolve, reject) => {
      this.appServ.authorizeUser();
      if (this.appServ.isUserLoggedIn && !this.appServ.loggedInUserDetails) {
        this.appServ.getMe().subscribe(data => {
          this.appServ.loggedInUserDetails = data;
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }
}
