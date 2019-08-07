import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

const LOGIN_ERROR_MESSAGES = {
  '401': 'Authorization failed. Please try again.',
  '404': 'You are not registered with us.'
};

@Component({
  selector: 'wm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail: string;
  public userPassword: string;
  private loginErrorMessages = LOGIN_ERROR_MESSAGES;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public appServ: AppService, private router: Router) {}

  onCancel(): void {
    this.closeLoginDialog();
  }

  closeLoginDialog() {
    this.dialogRef.close();
  }

  loginUser() {
    if (this.userEmail && this.userPassword) {
      this.appServ.loginUser({ loginId: this.userEmail, password: this.userPassword }).then(
        () => {
          this.appServ.openSnackBar('Logged in successfully', 'DISMISS');
          this.closeLoginDialog();
        },
        err => {
          let errorMessage = '';
          try {
            errorMessage = this.loginErrorMessages[err.status.toString()];
            errorMessage = errorMessage || 'Login Failed';
          } catch (e) {
            errorMessage = 'Login failed';
          }
          this.appServ.openSnackBar(errorMessage, 'DISMISS');
        }
      );
    }
  }

  ngOnInit() {}
}
