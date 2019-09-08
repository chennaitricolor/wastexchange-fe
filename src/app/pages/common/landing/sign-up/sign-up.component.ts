import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'app/app.service';

@Component({
  selector: 'wm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public mapInitZoom: number = 8;
  public mapCenterLat: number = 13.083437855572445;
  public mapCenterLng: number = 80.26962129752246;

  public pinnedLat: number;
  public pinnedLng: number;

  public otpValue: number;
  public otpSent: boolean = false;
  public geoLocationUnavailable: boolean = false;
  public newUserFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required]),
    mobNo: new FormControl('', [Validators.required]),
    altMobNo: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    lat: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<SignUpComponent>, public appServ: AppService) {}

  ngOnInit() {
    this.getGeoLocation();
  }

  onCancel(): void {
    this.closeSignupDialog();
  }

  closeSignupDialog() {
    this.dialogRef.close();
  }

  onNewUserFormVerify() {
    let formValues = this.newUserFormGroup.getRawValue();
    this.appServ
      .sendOtp({
        emailId: formValues['emailId'],
        mobileNo: formValues['mobNo']
      })
      .subscribe(response => {
        this.newUserFormGroup.disable();
        this.otpSent = true;
      });
  }

  onNewUserFormSubmit() {
    let formValues = this.newUserFormGroup.getRawValue();
    formValues.otp = this.otpValue;
    formValues.persona = 'buyer';
    this.appServ.registerUser(formValues).subscribe(
      response => {
        this.appServ.openSnackBar('Registered successfully', 'DISMISS');
        this.closeSignupDialog();
      },
      err => {
        this.appServ.openSnackBar('Registration failed. Please contact administrator.', 'DISMISS');
      }
    );
  }

  private getGeoLocation() {
    let setUserCoordinates = position => {
      [this.pinnedLat, this.pinnedLng] = [position.coords.latitude, position.coords.longitude];
      this.newUserFormGroup.patchValue({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    };

    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => setUserCoordinates(position),
        error => {
          this.geoLocationUnavailable = true;
        }
      );
    } else {
      this.geoLocationUnavailable = true;
    }
  }

  public mapClicked($event: any) {
    if ($event.coords) {
      [this.pinnedLat, this.pinnedLng] = [$event.coords.lat, $event.coords.lng];
      this.newUserFormGroup.patchValue({
        lat: $event.coords.lat,
        long: $event.coords.lng
      });
    }
  }
}
