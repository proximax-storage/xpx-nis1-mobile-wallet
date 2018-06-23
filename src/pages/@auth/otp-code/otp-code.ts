import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OtpCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-code',
  templateUrl: 'otp-code.html',
})
export class OtpCodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpCodePage');
  }

  onSubmit(otpCode) {
    console.log('otpCode', otpCode);
    this.navCtrl.setRoot('TabsPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
