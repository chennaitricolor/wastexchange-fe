import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerItem } from 'src/app/app.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class SellerService {

    constructor(private http: HttpClient) { }

    public getSellerItems(sellerId): Observable<SellerItem> {
        return this.http.get<SellerItem>(
            environment.hostName + `/seller/${sellerId}/items`
        );
    }

    public updateSellerItem(sellerItem: SellerItem): Observable<any> {
        return this.http.put<any>(
            environment.hostName + `/items/${sellerItem.id}`,
            sellerItem
        );
    }

}