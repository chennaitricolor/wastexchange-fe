import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "wm-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public userEmail: string;
  public userPassword: string;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private appServ: AppService,
    private router: Router
  ) {}

  onCancel(): void {
    this.closeLoginDialog();
  }

  closeLoginDialog() {
    this.dialogRef.close();
  }

  loginUser() {
    if (this.userEmail && this.userPassword) {
      this.appServ
        .loginUser({ email: this.userEmail, password: this.userPassword })
        .subscribe(response => {
          this.appServ.setSessionData(response);
          this.appServ.authorizeUser();
          this.appServ.getMe().subscribe(data => {
            this.appServ.loggedInUserInfo = data;
            this.appServ.getAllUsers().subscribe(response => {
              response.forEach(userDetail => {
                if (userDetail.userId == this.appServ.loggedInUserInfo["id"]) {
                  this.appServ.loggedInUserInfo["userDetails"] = userDetail;
                }
                switch (userDetail.persona) {
                  case "seller":
                    this.appServ.allSellers.push(userDetail);
                    break;

                  case "buyer":
                    this.appServ.allBuyers.push(userDetail);
                    break;

                  default:
                    break;
                }
              });
              this.closeLoginDialog();
            });
          });
        });
    }
  }

  ngOnInit() {}
}
