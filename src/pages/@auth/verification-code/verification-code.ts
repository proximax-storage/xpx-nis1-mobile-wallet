import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

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

  previousPin = '';
  isVerify = false;
  pinSubtitle: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    private alertProvider: AlertProvider,
    private utils: UtilitiesProvider
  ) { }

  ionViewWillEnter() {
    console.log('VerificationCodePage :: ionViewWillEnter',
      !this.navParams.data.destination &&
      this.navParams.data.status === 'verify'
    );

    if (
      !this.navParams.data.destination &&
      this.navParams.data.status === 'verify'
    ) {
      this.utils.setHardwareBack();
    } else {
      this.utils.setHardwareBackModal(this.viewCtrl);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
    console.log(this.navParams.data, this.navParams.data.title, this.navParams.data.subtitle, this.navParams.data.invalidPinMessage);

    this.pinTitle = this.navParams.data.title
      ? this.navParams.data.title
      : "Setup PIN";
     
    this.pinSubtitle = this.navParams.data.subtitle
    ? this.navParams.data.subtitle
    : "The following 6 PIN number is used to access your wallet. Please don't forget it: we won't be able to access your account.";

    this.invalidPinMessage = this.navParams.data.invalidPinMessage
      ? this.navParams.data.invalidPinMessage
      : 'Your pin is not equal to previous one. Please try again.';



    this.storage.get('pin').then(pin => {
      console.log('VerificationCodePage : pin', pin);
      if (this.navParams.data.status === 'verify') {
        this.isVerify = true;
        this.previousPin = pin;
      }
    });
  }

  onSubmit(pin) {
    let data: any = {
      status: 'verify',
      title: 'Repeat PIN',
      subtitle: 'Let\'s double check',
      pin: pin
    };
    data.destination = this.navParams.data.destination
      ? this.navParams.data.destination
      : null;

    if (this.navParams.data.status === 'confirm') {
      return this.utils.showModal('VerificationCodePage', data);
    }

    if (
      this.navParams.data.status === 'verify' &&
      this.navParams.data.pin === pin
    ) {
      this.isVerify = true;
      this.previousPin = pin;

      return this.storage.set('pin', pin).then(_ => {
        return this.storage.set('isModalShown', false);
      }).then(_ => {
        if (this.navParams.data.destination) {
          return this.navCtrl.setRoot(this.navParams.data.destination, data, {
            animate: true,
            direction: 'forward'
          });
        } else {
          this.viewCtrl.dismiss();
        }
      });
    } else if (
      this.navParams.data.status === 'verify' &&
      this.navParams.data.pin !== pin
    ) {
      // this.isVerify = false;

      // return this.alertProvider.showMessage(this.invalidPinMessage);
    }
  }
}
