import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { Address, MosaicTransferable } from 'nem-library';

import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { App } from '../../../../providers/app/app';

/**
 * Generated class for the TransactionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html'
})
export class TransactionDetailPage {
  App = App;
  tx: any;

  owner: Address;
  amount: number;
  mosaics: MosaicTransferable[];
  hasLevy: boolean;

  private _getAmount() {
    try {
      this.amount = this.tx.xem().amount;
    } catch (e) {
      this.amount = 0;
    }
  }

  private _getMosaics() {
    try {
      this.nemProvider
        .getMosaicsDefinition(this.tx.mosaics())
        .subscribe(mosaics => {
          this.mosaics = mosaics;
          this.hasLevy = this.mosaics.filter(mosaic => mosaic.levy).length
            ? true
            : false;
        });
    } catch (e) {
      this.mosaics = [];
    }
  }

  private _setOwner() {
    this.wallet.getSelectedWallet().then(wallet => {
      this.owner = wallet.address;
    });
  }

  constructor(
    private navParams: NavParams,
    private nemProvider: NemProvider,
    private wallet: WalletProvider,
    public utils: UtilitiesProvider
  ) {
    this.hasLevy = false;
    this.amount = 0;
    this.mosaics = [];
  }

  ngOnInit() {
    this.tx = JSON.parse(this.navParams.data);


    this._getAmount();
    this._getMosaics();
    this._setOwner();
  }
}
