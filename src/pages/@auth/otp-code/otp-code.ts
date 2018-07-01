import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { VerificationCodeProvider } from './../../../providers/verification-code/verification-code';

/**
 * Generated class for the OtpCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-code',
  templateUrl: 'otp-code.html'
})
export class OtpCodePage {
  pin: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private verificationProvider: VerificationCodeProvider
  ) {}

  ionViewWillEnter() {
    // console.log('this.navParams.data', this.navParams.data);
    // this.verificationProvider.generateToken(this.navParams.data).subscribe(
    //   (res: any) => {
    //     console.log('verificationProvider.generateToken', res);

    //     this.pin = res.json().otp_code;

    //     setTimeout(() => {
    //       this.onSubmit(this.pin);
    //     }, 1000);
    //   },
    //   err => {
    //     console.log('error: verificationProvider.generateToken', err);
    //   }
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpCodePage');
  }

  onSubmit(otpCode) {
    this.navCtrl.setRoot(
      'VerificationCodePage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );

    // this.verificationProvider.verify(otpCode).subscribe(
    //   (res: any) => {
    //     console.log('verificationProvider.verify', res);
    //     res = res.json();

    //     if (res.valid) {
    //       this.navCtrl.setRoot(
    //         'VerificationPage',
    //         {},
    //         {
    //           animate: true,
    //           direction: 'forward'
    //         }
    //       );
    //     } else {
    //       alert('An error occured.');
    //     }
    //   },
    //   err => {
    //     alert('An error occured.');
    //   }
    // );
  }
}
