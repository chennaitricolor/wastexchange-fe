import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bid, SellerItem, MATERIALS } from './app.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BuyerService } from './shared/services/buyer.service';
import { SellerService } from './shared/services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public isUserLoggedIn: boolean = false;
  public userSessionData: Object;
  public loggedInUserInfo: any;
  public allSellers: any[] = [];
  public allBuyers: any[] = [];
  public allUsers: any[] = [];
  public isLoading: boolean = false;
  public materials = MATERIALS;
  public title = 'INDIA WASTE EXCHANGE';
  public hidePageActions: boolean = false;

  constructor(
    private http: HttpClient,
    private rtr: Router,
    public snackBar: MatSnackBar,
    private buyerServ: BuyerService,
    private sellerServ: SellerService
  ) {}

  public getAllBids(): Observable<Bid[]> {
    return this.buyerServ.getAllBids();
  }

  public getBidsForBuyer(buyerId): Observable<Bid[]> {
    return this.buyerServ.getBidsForBuyer(buyerId);
  }

  public getSellerItems(sellerId): Observable<SellerItem> {
    return this.sellerServ.getSellerItems(sellerId);
  }

  public updateSellerItem(sellerItem: SellerItem): Observable<any> {
    return this.sellerServ.updateSellerItem(sellerItem);
  }

  public createBid(bid: Bid): Observable<any> {
    return this.buyerServ.createBid(bid);
  }

  public updateBid(bid: Bid): Observable<any> {
    return this.buyerServ.updateBid(bid);
  }

  public getBidById(bidId: number): Observable<any> {
    return this.buyerServ.getBid(bidId);
  }

  public getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(environment.hostName + '/users');
  }

  public getAllUsersAndFilter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAllUsers().subscribe(response => {
        this.allUsers = response;
        this.allBuyers = response.filter(user => user.persona == 'buyer');
        this.allSellers = response.filter(user => user.persona == 'seller');
        resolve(true);
      });
    });
  }

  public sendOtp(payload: any): Observable<any> {
    return this.http.post<any>(environment.hostName + '/users/sendOtp', payload);
  }

  public registerUser(userDetails: any): Observable<any> {
    return this.http.post<any>(environment.hostName + '/users/register', userDetails);
  }

  public loginUser(loginPayload: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.hostName + '/users/login', loginPayload).subscribe(response => {
        this.setSessionData(response);
        this.getMe().subscribe(response => {
          this.loggedInUserInfo = response;
          this.getAllUsersAndFilter().then(() => {
            resolve(true);
          });
        });
      });
    });
  }

  public getMe(): Observable<any> {
    return this.http.get<any>(environment.hostName + '/users/me');
  }

  public authorizeUser(): boolean {
    this.userSessionData = this.getUserSessionDataFromSession();
    this.isUserLoggedIn = !!(Object.keys(this.userSessionData).length && this.userSessionData['auth']);
    return this.isUserLoggedIn;
  }

  public getUserSessionDataFromSession() {
    let _userSessionData = new Object();
    for (let _counter = 0; _counter < sessionStorage.length; _counter++) {
      _userSessionData[sessionStorage.key(_counter)] = sessionStorage.getItem(sessionStorage.key(_counter));
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
    this.rtr.navigate(['']);
  }

  public setSessionData(userSessionData: Object) {
    Object.keys(userSessionData).forEach(key => {
      sessionStorage.setItem(key, userSessionData[key]);
      sessionStorage.setItem('sessionCreatedTime', Date.now().toString());
    });
    this.userSessionData = userSessionData;
    this.isUserLoggedIn = true;
  }

  public getSessionValue(key: string) {
    return sessionStorage.getItem(key) || '';
  }

  public setLoading(value) {
    setTimeout(() => {
      this.isLoading = value;
    }, 0);
  }

  public openSnackBar(message: string, action: string, duration: number = 5000) {
    return this.snackBar.open(message, action, { duration: duration });
  }

  //utils

  public setDefaultMaterialData(sellerItem) {
    Object.keys(this.materials).forEach(material => {
      !sellerItem.details[material] && (sellerItem.details[material] = { quantity: 0, cost: 0, bid: 0 });
    });
    return sellerItem;
  }
}
