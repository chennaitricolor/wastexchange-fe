import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wastexchange-fe';

  public appTitle = 'INDIA WASTE EXCHANGE';
  public isSmallScreen: boolean;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(public appServ: AppService, public breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe(['(max-width: 1020px)']).subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches;
    });
  }

  ngOnInit() {}

  /**
   * @description close the sidenav
   */
  public sidenavClose() {
    this.sidenav.close();
  }
}
