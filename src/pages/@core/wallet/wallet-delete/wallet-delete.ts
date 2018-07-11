import { SimpleWallet } from 'nem-library';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { WalletProvider } from '../../../../providers/wallet/wallet';

/**
 * Generated class for the WalletDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-delete',
  templateUrl: 'wallet-delete.html'
})
export class WalletDeletePage {
  App = App;
  formGroup: FormGroup;

  PASSWORD = '123qweasd';

  selectedWallet: SimpleWallet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private walletProvider: WalletProvider
  ) {
    this.selectedWallet = this.navParams.get('wallet');
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletDeletePage');
  }

  init() {
    this.formGroup = this.formBuilder.group({});
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

  onSubmit() {
    this.walletProvider
      .deleteWallet(this.selectedWallet)
      .then(selectedWallet => {
        return this.goBack();
      });
  }
}
