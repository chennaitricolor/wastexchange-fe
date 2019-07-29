import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from 'app/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public appServ: AppService) {}
  canActivate(): boolean {
    return this.appServ.authorizeUser();
  }
}
