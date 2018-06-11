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
  templateUrl: 'wallet-list.html',
})
export class WalletListPage {

  App = App;

  wallets: Array<{
    id: string,
    name: string
  }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.init();
  }

  init() {
    this.wallets = [
      {
        id: 'ID1234',
        name: 'Savings'
      },
      {
        id: 'ID4321',
        name: 'Personal'
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletListPage');
  }

}
