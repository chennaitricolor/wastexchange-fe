import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "wastexchange-fe";
  public isSmallScreen: boolean;

  constructor(
    public appServ: AppService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(['(max-width: 1020px)'])
      .subscribe((state: BreakpointState) => {
        this.isSmallScreen = state.matches;
      });
  }

  ngOnInit() {}
}
