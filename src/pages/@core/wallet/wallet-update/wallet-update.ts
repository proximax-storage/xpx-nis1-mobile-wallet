import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SimpleWallet } from 'nem-library';

import { App } from '../../../../providers/app/app';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { AuthProvider } from '../../../../providers/auth/auth';
import { AlertProvider } from '../../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the WalletUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-update',
  templateUrl: 'wallet-update.html'
})
export class WalletUpdatePage {
  App = App;
  formGroup: FormGroup;
  selectedWallet: SimpleWallet;

  PASSWORD: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private walletProvider: WalletProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private utils: UtilitiesProvider,
  ) {
    this.init();
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletUpdatePage');
  }

  init() {
    this.selectedWallet = this.navParams.get('wallet');

    this.formGroup = this.formBuilder.group({
      name: [
        this.selectedWallet.name || '',
        [Validators.minLength(3), Validators.required]
      ]
    });

    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  goBack() {
    return this.navCtrl.setRoot(
      'TabsPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    this.walletProvider.checkIfWalletNameExists(form.name).then(value => {
      if (value) {
        this.alertProvider.showMessage('This wallet name already exists. Please try again.');
      } else {
        this.walletProvider
          .updateWalletName(this.selectedWallet, form.name)
          .then(selectedWallet => {
            return this.walletProvider.setSelectedWallet(selectedWallet);
          })
          .then(selectedWallet => {
            this.goBack();
          });
      }
    });
  }
}
