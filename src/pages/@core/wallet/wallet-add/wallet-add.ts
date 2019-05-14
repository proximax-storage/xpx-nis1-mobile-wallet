import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { AuthProvider } from '../../../../providers/auth/auth';
import { AlertProvider } from '../../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { HapticProvider } from '../../../../providers/haptic/haptic';

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

  PASSWORD: string;

  walletColor:string = "wallet-1";
  walletName: string = "Primary";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private utils: UtilitiesProvider,
    private haptic: HapticProvider
  ) {
    this.init();
    this.walletColor = "wallet-1";
  }

  changeWalletColor(color){
    this.walletColor = color;
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);
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
        this.alertProvider.showMessage('Wallet name already exist. Please choose a new one.');
      } else {
        this.walletProvider.storeWallet(newWallet, this.walletColor).then(value => {

          newWallet.walletColor = this.walletColor;
          console.log("New wallet:",newWallet);
          return this.walletProvider.setSelectedWallet(newWallet);
        }).then(() => {
          this.haptic.notification({ type: 'success' });
          delete newWallet.total;
          delete newWallet.walletColor;
          this.gotoBackup(newWallet);
        });
      }
    });
  }

  updateName(val) {
    if(val) {
      this.walletName = val;
    } else {
      this.walletName = "Primary";
    }
  }
}
