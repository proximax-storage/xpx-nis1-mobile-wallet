import { AuthProvider } from './../../../../providers/auth/auth';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertProvider } from '../../../../providers/alert/alert';
import { NemProvider } from './../../../../providers/nem/nem';

/**
 * Generated class for the WalletAddPasswordConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-add-password-confirmation',
  templateUrl: 'wallet-add-password-confirmation.html'
})
export class WalletAddPasswordConfirmationPage {
  formGroup: FormGroup;
  credentials: { password: string; privateKey: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public authProvider: AuthProvider,
    public nemProvider: NemProvider
  ) {
    this.init();
  }

  init() {

    this.authProvider.getPassword().then(password => {
      // Initialize private data
      this.credentials = {
        password: password,
        privateKey: ''
      };
    });

    // Initialize form
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPasswordConfirmationPage');
  }

  gotoHome() {
    this.navCtrl.setRoot(
      'WalletListPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    if (form.password === this.credentials.password) {
      const privateKey = this.nemProvider.decryptPrivateKey(
        this.credentials.password,
        this.navParams.data
      );
      this.navCtrl.push('WalletAddPrivateKeyPage', {
        name: this.navParams.data.data.name,
        privateKey: privateKey
      });
    } else {
      this.alertProvider.showMessage('Incorrect password. Please try again.');
    }
  }
}
