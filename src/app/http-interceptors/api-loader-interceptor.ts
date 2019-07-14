import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AppService } from "../app.service";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private appServ: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.appServ.setLoading(true);
    return next.handle(request).pipe(
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
