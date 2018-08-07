import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable } from 'nem-library';

import { App as AppConfig } from '../../providers/app/app';
import { WalletProvider } from '../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { GetBalanceProvider } from '../../providers/get-balance/get-balance';
import { AlertProvider } from '../../providers/alert/alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  AppConfig = AppConfig;

  selectedMosaic: MosaicTransferable;
  mosaics: Array<MosaicTransferable>;

  selectedWallet: SimpleWallet;

  fakeList: Array<any>;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public getBalanceProvider: GetBalanceProvider,
    public alertProvider: AlertProvider,
    public walletProvider: WalletProvider,
    public utils: UtilitiesProvider
  ) {
    this.fakeList = [{}, {}];
  }

  ionViewWillEnter() {
    this.utils.setHardwareBackToPage('WalletListPage');

    this.walletProvider.getSelectedWallet().then(wallet => {
      if (!wallet) this.navCtrl.setRoot('WalletListPage');
      else {
        this.selectedWallet = wallet;
        this.getBalance();
      }
    });
  }

  /**
   * Retrieves current account owned mosaics  into this.mosaics
   */
  public getBalance() {
    this.getBalanceProvider
      .mosaics(this.selectedWallet.address)
      .subscribe(mosaics => {
        this.mosaics = mosaics;

        if (this.mosaics.length > 0) {
          this.selectedMosaic =
            this.navParams.get('selectedMosaic') || this.mosaics[0];
        }
      });
  }

  gotoWalletList() {
    this.utils.setRoot('WalletListPage');
  }

  gotoCoinPrice(mosaic) {
    let coinId = '';

    if (mosaic === 'xem') {
      coinId = 'nem';
    } else if (mosaic === 'xpx') {
      coinId = 'proximax';
    } else if (mosaic === 'lyl') {
      coinId = 'loyalcoin';
    } else {
      this.alertProvider.showMessage(
        "We're sorry but we don't have any available data for this mosaic yet."
      );
      return;
    }

    this.navCtrl.push('CoinPriceChartPage', coinId);
  }
}
