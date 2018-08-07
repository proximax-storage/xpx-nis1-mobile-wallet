import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimpleWallet, TransactionTypes } from 'nem-library';
import { Observable } from 'rxjs';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the TransactionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html'
})
export class TransactionListPage {
  App = App;
  TransactionTypes = TransactionTypes;

  currentWallet: SimpleWallet;
  transactions: Array<any>;
  fakeList: Array<any>;
  hasTransactions: boolean;

  pageable: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
  ) { }

  ionViewWillEnter() {
    this.transactions = null;

    this.utils.setTabIndex(0);

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

        this.fakeList = [{}, {}];

        this.pageable = this.nemProvider.getAllTransactions(
          this.currentWallet.address
        );

        Observable.zip(
          this.nemProvider
            .getAllTransactions(this.currentWallet.address)
            .flatMap(_ => _)
            .toArray(),
          this.nemProvider
            .getUnconfirmedTransactions(this.currentWallet.address)
            .flatMap(_ => _)
            .toArray()
        ).subscribe(([confirmedTransactions, unconfirmedTransactions]) => {
          if (this.transactions) {
            this.transactions.push(...confirmedTransactions);
          } else if (confirmedTransactions.length) {
            this.transactions = [...unconfirmedTransactions, ...confirmedTransactions];
          }

          if (!this.transactions) {
            this.transactions = [];
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionListPage');
  }

  // Treat the instructor name as the unique identifier for the object
  trackByHash(index, transaction) {
    // return transaction.getTransactionInfo().hash.data;
    return index;
  }

  gotoReceive() {
    this.navCtrl.push('ReceivePage');
  }

  gotoTransactionDetail(tx) {
    this.navCtrl.push('TransactionDetailPage', tx);
  }

  loadMore() {
    if (!this.hasTransactions) return;
    this.pageable.nextPage();
  }
}
