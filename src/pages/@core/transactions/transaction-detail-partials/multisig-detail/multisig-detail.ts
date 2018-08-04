//"type": 4100

import { Component, Input } from '@angular/core';

import {
  Address,
  CosignatoryModification,
  MosaicTransferable,
  TransferTransaction
} from 'nem-library';

import { NemProvider } from '../../../../../providers/nem/nem';
import { WalletProvider } from '../../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../../providers/utilities/utilities';
import { App } from '../../../../../providers/app/app';

@Component({
  selector: 'multisig-detail',
  templateUrl: 'multisig-detail.html'
})
export class MultisigDetailComponent {
  @Input() tx: any;
  App = App;

  owner: Address;
  amount: number;
  mosaics: MosaicTransferable[];
  hasLevy: boolean;
  modifications: CosignatoryModification[];

  private _getAmount() {
    try {
      this.amount = (<TransferTransaction>(
        this.tx.otherTransaction
      )).xem().amount;
    } catch (e) {
      this.amount = 0;
    }
  }

  private _getMosaics() {
    try {
      this.nem
        .getMosaicsDefinition(
          (<TransferTransaction>this.tx.otherTransaction).mosaics()
        )
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

  private _getCosignatoryModification() {
    try {
      this.modifications = this.tx.otherTransaction.modifications;
    } catch (e) {
      this.modifications = [];
    }
  }

  private _setOwner() {
    this.wallet.getSelectedWallet().then(wallet => {
      this.owner = wallet.address;
    });
  }

  constructor(
    private nem: NemProvider,
    private wallet: WalletProvider,
    public utils: UtilitiesProvider
  ) {
    this.amount = 0;
    this.mosaics = [];
    this.hasLevy = false;
  }

  ngOnInit() {
    this._getMosaics();
    this._setOwner();
    this._getAmount();
    this._getCosignatoryModification();

    console.log(this.tx)
  }
}
