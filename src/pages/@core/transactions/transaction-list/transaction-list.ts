import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController } from 'ionic-angular';
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
  showEmptyMessage: boolean;
  isLoading: boolean;

  isLoadingInfinite: boolean = false;

  pageable: Pageable<Transaction[]>;

  @ViewChild(InfiniteScroll)
  private infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = false;
    this.isLoading = true;

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

            if(!this.confirmedTransactions) this.showEmptyMessage = false;

            if (this.isLoadingInfinite) {
              this.isLoadingInfinite = false;

              this.confirmedTransactions.push(...result);
              this.infiniteScroll.complete();
            }

            this.isLoading = false;
            this.confirmedTransactions = result;
            this.infiniteScroll.enable(true);
          },
            err => console.error(err),
            () => {
              this.isLoading = false;
              this.showEmptyMessage = true;

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
    // this.navCtrl.push('ReceivePage');
    let page = "ReceivePage";
    const modal = this.modalCtrl.create(page, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  gotoTransactionDetail(tx) {
    this.navCtrl.push('TransactionDetailPage', tx);
  }

  doInfinite() {
    if (!this.showEmptyMessage) return;
    this.isLoadingInfinite = true;
    this.pageable.nextPage();
    console.log('Pageable Txs: ', this.pageable);
  }
}
