import { GetBalanceProvider } from './../../../../../providers/get-balance/get-balance';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable } from 'nem-library';

import { App } from '../../../../../providers/app/app';
import { WalletProvider } from '../../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../../providers/utilities/utilities';

/**
 * Generated class for the SendMosaicSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-mosaic-select',
  templateUrl: 'send-mosaic-select.html'
})
export class SendMosaicSelectPage {
  App = App;

  selectedMosaic: MosaicTransferable;
  mosaics: Array<MosaicTransferable>;

  selectedWallet: SimpleWallet;

  fakeList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public getBalanceProvider: GetBalanceProvider,
    public walletProvider: WalletProvider,
    public utils: UtilitiesProvider,
  ) {
    this.fakeList = [{}, {}];
  }

  ionViewWillEnter() {

    this.walletProvider.getSelectedWallet().then(wallet => {
      if (!wallet) this.navCtrl.setRoot('WalletListPage');
      else {
        this.selectedWallet = wallet;
        this.getBalance();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMosaicSelectPage');
  }

  onSelect(data) {
    this.selectedMosaic = data;
  }

  onSubmit() {
    this.viewCtrl.dismiss(this.selectedMosaic);
  }

  /**
   * Retrieves current account owned mosaics  into this.mosaics
   */
  public getBalance() {
    this.getBalanceProvider.mosaics(this.selectedWallet.address).subscribe(mosaics => {
      this.mosaics = mosaics;

      if (this.mosaics.length > 0) {
        this.selectedMosaic = this.navParams.get('selectedMosaic') || this.mosaics[0];
      }
    });
  }


}
