import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { SimpleWallet } from '../../../../../node_modules/nem-library';

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

  PASSWORD = '123qweasd';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private walletProvider: WalletProvider
  ) {
    this.init();
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
    this.walletProvider.checkIfWalletNameExists(form.name).then(value => {
      if (value) {
        alert('This wallet name already exists. Please try again.');
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
