import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from 'app/app.model';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: "root"
})
export class BuyerService {

    constructor(private http: HttpClient) { }

    public getAllBids(): Observable<Bid[]> {
        return this.http.get<Bid[]>(environment.hostName + "/bids");
    }

    public getBidsForBuyer(buyerId): Observable<Bid[]> {
        return this.http.get<Bid[]>(
            environment.hostName + `/buyer/${buyerId}/bids`
        );
    }

    public createBid(bid: Bid): Observable<any> {
        return this.http.post<any>(
            environment.hostName + `/buyer/${bid.buyerId}/bids`,
            bid
        );
    }

    public updateBid(bid: Bid): Observable<any> {
        return this.http.put<any>(
            environment.hostName + `/bids/${bid.id}`,
            bid
        );
    }

    public getBid(bidId: number): Observable<any> {
        return this.http.get<any>(environment.hostName + `/bids/${bidId}`);
    }

}