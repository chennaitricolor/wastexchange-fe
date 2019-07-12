import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Bid, SellerItem, Seller } from "./app.model";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

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
}
