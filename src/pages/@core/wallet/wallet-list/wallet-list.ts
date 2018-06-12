import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';

/**
 * Generated class for the WalletListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-list',
  templateUrl: 'wallet-list.html'
})
export class WalletListPage {
  App = App;

  selectedWallet: any;
  wallets: Array<{
    id: string;
    name: string;
    type: string;
    balance: number;
    selected: boolean;
  }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  init() {
    this.wallets = [
      {
        id: 'ID1234',
        name: 'Savings',
        type: 'Normal',
        balance: 100,
        selected: true
      },
      {
        id: 'ID4321',
        name: 'Personal',
        type: 'Multisig',
        balance: 200,
        selected: false
      }
    ];
    this.selectedWallet = this.wallets[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletListPage');
  }

  onWalletSelect(wallet) {
    this.selectedWallet = wallet;

    this.navCtrl.setRoot(
      'TabsPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  gotoAddWallet() {
    this.navCtrl.push('WalletAddPage');
  }
}
