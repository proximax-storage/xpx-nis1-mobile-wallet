import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html',
})
export class VerificationCodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
  }

  onSubmit(pin) {
    console.log('pin', pin);
    this.navCtrl.setRoot('WalletListPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
