import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';

/**
 * Generated class for the WalletAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-add',
  templateUrl: 'wallet-add.html'
})
export class WalletAddPage {
  App = App;
  formGroup: FormGroup;

  PASSWORD = '123qweasd';

  @ViewChild('walletName') walletName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');

    setTimeout(() => {
      this.walletName.setFocus();
    }, 150);
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]]
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
    const newWallet = this.nemProvider.createSimpleWallet(form.name, this.PASSWORD);

    this.walletProvider.checkIfWalletNameExists(newWallet.name).then(value => {
      if (value) {
        alert('This wallet name already exists. Please try again.');
      } else {
        this.walletProvider.storeWallet(newWallet).then(value => {
          return this.goBack();
        }).then(() => {
          this.walletProvider.setSelectedWallet(newWallet);
        });
      }
    });
  }
}
