import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "wastexchange-fe";

  constructor(private appServ: AppService) {}

  ngOnInit() {
    this.appServ.getAllUsers().subscribe(response => {
      response.forEach(user => {
        switch (user.persona) {
          case "seller":
            user.lat = 12.9652163;
            user.long = 80.1902814;
            this.appServ.allSellers.push(user);
            break;

          case "buyer":
            this.appServ.allBuyers.push(user);
            break;

          default:
            break;
        }
      });
    });
  }
}
