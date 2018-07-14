import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimpleWallet } from 'nem-library';

import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

import { NemProvider } from './../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { ToastProvider } from '../../../../providers/toast/toast';

/**
 * Generated class for the PrivateKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private-key',
  templateUrl: 'private-key.html'
})
export class PrivateKeyPage {
  currentWallet: SimpleWallet;
  privateKey: string;
  password: string;

  QRData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public walletProvider: WalletProvider,
    private nemProvider: NemProvider,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private toastProvider: ToastProvider
  ) {
    this.password = this.navParams.data;
  }

  ionViewWillEnter() {
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (!currentWallet) {
        this.navCtrl.setRoot(
          'WalletListPage',
          {},
          {
            animate: true,
            direction: 'backward'
          }
        );
      } else {
        this.currentWallet = currentWallet;
        this.privateKey = this.nemProvider.passwordToPrivateKey(
          this.password,
          this.currentWallet
        );
        this.QRData = this.nemProvider.generateWalletQRText(
          this.password,
          this.currentWallet
        );
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivateKeyPage');
  }

  copy() {
    this.clipboard.copy(this.privateKey).then(_ => {
      this.toastProvider.show('Copied private key successfully', 3, true);
    });
  }

  share() {
    this.socialSharing
      .share(
        `Private key of ${this.currentWallet.name}: \n${this.privateKey}`,
        null,
        null,
        null
      )
      .then(_ => {});
  }
}
