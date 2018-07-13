import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { SimpleWallet } from '../../../../../node_modules/nem-library';
import { NemProvider } from '../../../../providers/nem/nem';

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
    private walletProvider: WalletProvider
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
    let QRCode: any = this.nemProvider.generateAddressQRText(this.currentWallet.address);
    QRCode = JSON.parse(QRCode);
    QRCode.name = this.currentWallet.name;

    return JSON.stringify(QRCode);
  }
}
