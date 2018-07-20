import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../../providers/alert/alert';

/**
 * Generated class for the VerificationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html'
})
export class VerificationCodePage {
  pinTitle: string;
  invalidPinMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertProvider: AlertProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
    this.pinTitle = this.navParams.data.title
      ? this.navParams.data.title
      : 'Enter Pin';

    this.invalidPinMessage = this.navParams.data.invalidPinMessage
      ? this.navParams.data.invalidPinMessage
      : 'Your pin is not equal to previous one. Please try again.';
  }

  onSubmit(pin) {
    console.log('pin', pin);

    if (this.navParams.data.status === 'confirm') {
      return this.navCtrl.push(
        'VerificationCodePage',
        { status: 'verify', title: 'Verify pin', pin: pin },
        {
          animate: true,
          direction: 'forward'
        }
      );
    }

    if (
      this.navParams.data.status === 'verify' &&
      this.navParams.data.pin === pin
    ) {
      return this.storage.set('pin', pin).then(_ => {
        return this.navCtrl.setRoot(
          'WalletListPage',
          {},
          {
            animate: true,
            direction: 'forward'
          }
        );
      });
    } else if (
      this.navParams.data.status === 'verify' &&
      this.navParams.data.pin !== pin
    ) {
      return this.alertProvider.showMessage(this.invalidPinMessage);
    }
  }
}
