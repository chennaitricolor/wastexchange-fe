import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import { AppService } from "app/app.service";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(public appServ: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.appServ.setLoading(true);

    const authReq = this.appServ.isUserLoggedIn
      ? request.clone({
          headers: new HttpHeaders({
            'x-access-token': this.appServ.getSessionValue('token')
          })
        })
      : request;

    return next.handle(authReq).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        throw err;
      })
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.appServ.setLoading(false);
    }
  }
}
