import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { SimpleWallet, TransactionTypes, Pageable, Transaction } from 'nem-library';
import { Observable } from 'nem-library/node_modules/rxjs/Observable';

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
  fakeList: Array<any>;

  unconfirmedTransactions: Array<any>;
  confirmedTransactions: Array<any>;
  hasTransactions: boolean;

  pageable: Pageable<Transaction[]>;

  @ViewChild(InfiniteScroll)
  private infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
  ) { }

  ionViewWillEnter() {
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;

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

        this.pageable = this.nemProvider.getAllTransactionsPaginated(
          this.currentWallet.address
        );

        this.nemProvider
          .getUnconfirmedTransactions(this.currentWallet.address)
          .flatMap(_ => _)
          .toArray()
          .subscribe(result => {
            this.unconfirmedTransactions = result;
            this.infiniteScroll.complete();
          });

        this.pageable
          .map((txs: any) => txs ? txs : Observable.empty())
          .subscribe(result => {
            if (!this.confirmedTransactions) {
              this.confirmedTransactions = result;
              this.infiniteScroll.enable(true);
            }

            if (result.length) {
              this.hasTransactions = true;
              this.confirmedTransactions.push(...result);
              this.infiniteScroll.complete();
            }
          },
            err => console.error(err),
            () => {
              this.hasTransactions = false;
              this.infiniteScroll.complete();
              this.infiniteScroll.enable(false);
            });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionListPage');
  }

  // Track transaction by hash
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

  doInfinite() {
    if (!this.hasTransactions) return;
    this.pageable.nextPage();
    console.log('Pageable Txs: ', this.pageable);
  }
}
