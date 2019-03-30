import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll, ViewController } from "ionic-angular";
import { TransactionTypes, SimpleWallet, Transaction, Pageable, TransferTransaction } from "nem-library";
import { Observable } from "rxjs";
import { CoingeckoProvider } from "../../../../providers/coingecko/coingecko";
import { CoinPriceChartProvider } from "../../../../providers/coin-price-chart/coin-price-chart";
import { UtilitiesProvider } from "../../../../providers/utilities/utilities";
import { NemProvider } from "../../../../providers/nem/nem";
import { WalletProvider } from "../../../../providers/wallet/wallet";
import find from 'lodash/find';
import { App } from "../../../../providers/app/app";

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
  /** Transaction list member variables */
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

  coindId: string;
  mosaicId: string;
  walletName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public coingeckoProvider: CoingeckoProvider,
    public coinPriceChartProvider: CoinPriceChartProvider,
    public utils: UtilitiesProvider,
    private modalCtrl: ModalController,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private viewCtrl: ViewController
  ) {
   
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);

    /** Transaction list business logic */
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = false;
    this.isLoading = true;

    this.utils.setTabIndex(0);

    this.walletProvider.getSelectedWallet().then(currentWallet => {
      this.walletName = currentWallet.name;

      if (!currentWallet) {
        this.navCtrl.setRoot(
          'TabsPage',
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
            // filter result with mosaicId
            // this.searchByMosaicId(this.mosaicId, result);
            console.info("Transactions", result);
            if (!this.confirmedTransactions) this.showEmptyMessage = false;

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
    console.log("ionViewDidLoad CoinPriceChartPage");
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  showReceiveModal() {
    let page = "ReceivePage";
    const modal = this.modalCtrl.create(page, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  showSendModal() {
    let page = "SendPage";
    const modal = this.modalCtrl.create(page, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  /** Transaction list methods */
  trackByHash(index) {
    return index;
  }

  gotoTransactionDetail(tx) {
    this.navCtrl.push('TransactionDetailPage', tx);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  // doInfinite() {
  //   console.log('Do infinite. ');
  //   if (this.showEmptyMessage) return;
  //   this.isLoadingInfinite = true;
  //   this.pageable.nextPage();
  //   console.log('Pageable Txs: ', this.pageable);
  // }

  

  // searchByMosaicId(mosaicId: string, transactions: Array<Transaction>) {
  //   let txs = <TransferTransaction[]>transactions.filter(transaction => transaction.type == TransactionTypes.TRANSFER);
  //   txs.filter(tx => {
  //     try {
  //       if(tx.mosaicIds()) {
  //         tx.mosaicIds().filter(mosaic => { return mosaic.name == mosaicId});
  //       }
  //     } catch (err) {
  //       console.info("No mosaic", err);
  //     }
  //   })
  // }
}
