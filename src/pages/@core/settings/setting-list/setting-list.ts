import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { SimpleWallet } from 'nem-library';

import { WalletProvider } from '../../../../providers/wallet/wallet';
import { NemProvider } from '../../../../providers/nem/nem';
import { ToastProvider } from './../../../../providers/toast/toast';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the SettingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-list',
  templateUrl: 'setting-list.html'
})
export class SettingListPage {
  currentWallet: SimpleWallet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nemProvider: NemProvider,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingListPage');
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
      }
    });
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  getQRCode() {
    let QRCode: any = this.nemProvider.generateAddressQRText(
      this.currentWallet.address
    );
    QRCode = JSON.parse(QRCode);
    QRCode.data.name = this.currentWallet.name;

    return JSON.stringify(QRCode);
  }

  copy(address: string) {
    this.clipboard.copy(address).then(_ => {
      this.toastProvider.show('Copied address successfully', 3, true);
    });
  }

  showComingSoon() {
    this.utils.showInsetModal('ComingSoonPage', {}, 'small');
  }
}
