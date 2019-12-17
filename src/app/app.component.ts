import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router'; // import Router and NavigationEnd

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wastexchange-fe';
  public resourcePartnerText: String = 'Resource Partners';
  public appTitle = 'Madras Waste Exchange';
  public isSmallScreen: boolean;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(public appServ: AppService, public breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe(['(max-width: 1020px)']).subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches;
    });

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
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
