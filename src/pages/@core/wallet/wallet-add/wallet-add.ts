import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { AuthProvider } from '../../../../providers/auth/auth';

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

  PASSWORD : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private authProvider: AuthProvider,
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]]
    });

    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  gotoBackup(wallet) {
    return this.navCtrl.push('WalletBackupPage', wallet);
  }

  onSubmit(form) {
    const newWallet = this.nemProvider.createSimpleWallet(form.name, this.PASSWORD);

    this.walletProvider.checkIfWalletNameExists(newWallet.name).then(value => {
      if (value) {
        alert('This wallet name already exists. Please try again.');
      } else {
        this.walletProvider.storeWallet(newWallet).then(value => {
          return this.walletProvider.setSelectedWallet(newWallet);
        }).then(() => {
          this.gotoBackup(newWallet);
        });
      }
    });
  }
}
