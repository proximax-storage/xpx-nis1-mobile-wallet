import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
/**
 * Generated class for the WalletAddPrivateKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-add-private-key',
  templateUrl: 'wallet-add-private-key.html'
})
export class WalletAddPrivateKeyPage {
  App = App;
  formGroup: FormGroup;

  PASSWORD = '123qweasd';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      privateKey: ['', [Validators.minLength(3), Validators.required]]
    });

    if (this.navParams.data) {
      this.formGroup.setValue(this.navParams.data);
    }
  }

  goBack() {
    return this.navCtrl.setRoot(
      'WalletListPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    const newWallet = this.nemProvider.createPrivateKeyWallet(
      form.name,
      this.PASSWORD,
      form.privateKey
    );

    this.walletProvider.checkIfWalletNameExists(newWallet.name).then(value => {
      if (value) {
        alert('This wallet name already exists. Please try again.');
      } else {
        this.walletProvider
          .storeWallet(newWallet)
          .then(value => {
            return this.goBack();
          })
          .then(() => {
            this.walletProvider.setSelectedWallet(newWallet);
          });
      }
    });
  }
}
