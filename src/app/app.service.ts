import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Bid, SellerItem, Seller, MATERIALS } from "./app.model";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public isUserLoggedIn: boolean = false;
  public userSessionData: Object;
  public loggedInUserInfo: Object;
  public allSellers: any[] = [];
  public allBuyers: any[] = [];
  public allUsers: any[] = [];
  public isLoading: boolean = false;
  public materials = MATERIALS;

  constructor(private httpClient: HttpClient, private rtr: Router) {}

  public getBids(): Observable<Bid[]> {
    return this.httpClient.get<Bid[]>(environment.hostName + "/bids");
  }

  public getSellerItems(sellerId): Observable<SellerItem> {
    return this.httpClient.get<SellerItem>(
      environment.hostName + `/seller/${sellerId}/items`
    );
  }

  public updateSellerItem(sellerItem: SellerItem) {
    return this.httpClient.put<any>(
      environment.hostName + `/items/${sellerItem.id}`,
      sellerItem
    );
  }

  public createBid(bid: Bid) {
    return this.httpClient.post<any>(
      environment.hostName + `/buyer/${bid.buyerId}/bids`,
      bid
    );
  }

  public updateBid(bid: Bid): Observable<any> {
    return this.httpClient.put<any>(
      environment.hostName + `/bids/${bid.id}`,
      bid
    );
  }

  public getBid(bidId: number): Observable<any> {
    return this.httpClient.get<any>(environment.hostName + `/bids/${bidId}`);
  }

  public getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.hostName + "/users");
  }

  public loginUser(loginPayload: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(environment.hostName + "/users/login", loginPayload)
        .subscribe(response => {
          this.setSessionData(response);
          this.getMe().subscribe(response => {
            this.loggedInUserInfo = response;
            resolve(true);
          });
        });
    });
  }

  public getMe(): Observable<any> {
    let headers = { "x-access-token": this.getSessionValue("token") };
    return this.httpClient.get<any>(environment.hostName + "/users/me", {
      headers
    });
  }

  public authorizeUser(): boolean {
    this.userSessionData = this.getUserSessionDataFromSession();
    this.isUserLoggedIn = !!(
      Object.keys(this.userSessionData).length && this.userSessionData["auth"]
    );
    return this.isUserLoggedIn;
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
    this.isUserLoggedIn = false;
  }

  public forceLogoutUser() {
    this.clearSessionData();
    this.rtr.navigate([""]);
  }

  public setSessionData(userSessionData: Object) {
    Object.keys(userSessionData).forEach(key => {
      sessionStorage.setItem(key, userSessionData[key]);
      sessionStorage.setItem("sessionCreatedTime", Date.now().toString());
    });
    this.userSessionData = userSessionData;
    this.isUserLoggedIn = true;
  }

  public getSessionValue(key: string) {
    return sessionStorage.getItem(key) || "";
  }

  public setLoading(value) {
    setTimeout(() => {
      this.isLoading = value;
    }, 0);
  }

  //utils

  public setDefaultMaterialData(sellerItem) {
    Object.keys(this.materials).forEach(material => {
      !sellerItem.details[material] &&
        (sellerItem.details[material] = { quantity: 0, cost: 0, bid: 0 });
    });
    return sellerItem;
  }
}

import { CanActivate } from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private appServ: AppService) {}
  canActivate(): boolean {
    return this.appServ.authorizeUser();
  }
}

@Injectable()
export class UserSessionDataResolver implements Resolve<any> {
  constructor(private appServ: AppService, private rtr: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
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

import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

@Injectable()
export class UserDataResolver implements Resolve<any> {
  constructor(private appServ: AppService, private rtr: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.appServ.userSessionData = this.appServ.getUserSessionDataFromSession();

    return new Promise((resolve, reject) => {
      this.appServ.allUsers.length
        ? resolve(true)
        : this.appServ.getAllUsers().subscribe(response => {
            this.appServ.allUsers = response;
            this.appServ.allBuyers = response.filter(
              user => user.persona == "buyer"
            );
            this.appServ.allSellers = response.filter(
              user => user.persona == "seller"
            );
            resolve(true);
          });
    });
  }
}
