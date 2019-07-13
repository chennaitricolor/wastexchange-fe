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
  public loggedInUserInfo: Object;
  public allSellers: any[] = [];
  public allBuyers: any[] = [];

  constructor(private httpClient: HttpClient, private rtr: Router) {}

  public getBids(): Observable<Bid[]> {
    return this.httpClient.get<Bid[]>(environment.hostName + "/bids");
  }

  public getSellerItems(sellerId): Observable<SellerItem> {
    return this.httpClient.get<SellerItem>(environment.hostName + `/seller/${sellerId}/items`);
  }

  public updateSellerItem(sellerItem: SellerItem) {
    return this.httpClient.put<any>(environment.hostName + `/items/${sellerItem.id}`, sellerItem);
  }

  public createBid(bid: Bid) {
    return this.httpClient.post<any>(environment.hostName + `/buyer/${bid.buyerId}/bids`, bid);
  }

  public updateBid(bid: Bid): Observable<any> {
    return this.httpClient.put<any>(environment.hostName + `/bids/${bid.id}`, bid);
  }

  public getBid(bidId: number): Observable<any> {
    return this.httpClient.get<any>(environment.hostName + `/bids/${bidId}`);
  }

  public getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.hostName + "/userdetails");
  }

  public loginUser(loginPayload: any): Observable<any> {
    return this.httpClient.post<any>(environment.hostName + "/users/login", loginPayload);
  }

  public getMe(): Observable<any> {
    let headers = { "x-access-token": this.getSessionValue("token") };
    return this.httpClient.get<any>(environment.hostName + "/users/me", { headers });
  }

  public authorizeUser() {
    this.userSessionData = this.getUserSessionDataFromSession();
    this.isUserLoggedIn = !!(
      Object.keys(this.userSessionData).length && this.userSessionData["auth"]
    );
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
    this.loggedInUserInfo = null;
    this.isUserLoggedIn = false;
    this.rtr.navigate([""]);
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
    return new Promise((resolve, reject) => {
      this.appServ.authorizeUser();
      if (this.appServ.isUserLoggedIn && !this.appServ.loggedInUserInfo) {
        this.appServ.getMe().subscribe(data => {
          this.appServ.loggedInUserInfo = data;
          this.appServ.getAllUsers().subscribe(response => {
            response.forEach(userDetail => {
              if (userDetail.userId == this.appServ.loggedInUserInfo["id"]) {
                this.appServ.loggedInUserInfo["userDetails"] = userDetail;
              }
              switch (userDetail.persona) {
                case "seller":
                  this.appServ.allSellers.push(userDetail);
                  break;

                case "buyer":
                  this.appServ.allBuyers.push(userDetail);
                  break;

                default:
                  break;
              }
            });
            resolve(true);
          });
        });
      } else {
        resolve(true);
      }
    });
  }
}
