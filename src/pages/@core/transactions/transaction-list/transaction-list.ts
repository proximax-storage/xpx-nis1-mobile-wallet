import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll, ViewController } from "ionic-angular";
import { TransactionTypes, SimpleWallet, Transaction, Pageable, TransferTransaction, AccountInfoWithMetaData } from "nem-library";
import { Observable } from "rxjs";
import { CoingeckoProvider } from "../../../../providers/coingecko/coingecko";
import { CoinPriceChartProvider } from "../../../../providers/coin-price-chart/coin-price-chart";
import { UtilitiesProvider } from "../../../../providers/utilities/utilities";
import { NemProvider } from "../../../../providers/nem/nem";
import { WalletProvider } from "../../../../providers/wallet/wallet";
import find from 'lodash/find';
import { App } from "../../../../providers/app/app";
import { ToastProvider } from "../../../../providers/toast/toast";
import { Clipboard } from "@ionic-native/clipboard";
import sortBy from 'lodash/sortBy';
import { GetBalanceProvider } from "../../../../providers/get-balance/get-balance";
import { GetMarketPricePipe } from "../../../../pipes/get-market-price/get-market-price";

/**
 * Generated class for the TransactionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
  providers: [GetMarketPricePipe]
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

  accountInfo: AccountInfoWithMetaData;
  totalBalance: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public coingeckoProvider: CoingeckoProvider,
    public coinPriceChartProvider: CoinPriceChartProvider,
    public utils: UtilitiesProvider,
    private modalCtrl: ModalController,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private viewCtrl: ViewController,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider,
    private getBalanceProvider: GetBalanceProvider,
    private marketPrice: GetMarketPricePipe,
  ) {
   
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);

    /** Transaction list business logic */
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = true;

    this.utils.setTabIndex(0);

    this.walletProvider.getSelectedWallet().then(currentWallet => {
      

      if (currentWallet) {
        this.walletName = currentWallet.name;
        this.getTotalBalance(currentWallet);
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

            this.isLoading = true;

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
    console.log("ionViewDidLoad TransactionListPage");

  }

  getTotalBalance(wallet: SimpleWallet): Promise<number> {
    return new Promise((resolve) => {
      this.getBalanceProvider
        .mosaics(wallet.address)
        .subscribe(mosaics => {
          let total = 0;

          mosaics.reduce((accumulator, mosaic, currentIndex, array) => {
            this.marketPrice.transform(mosaic.mosaicId.name).then(price => {
              if (price > 0) {
                total += price * mosaic.amount;
                console.log(total);
              }
              // last loop: compute total
              let lastItem = array.length - 1;
              if (currentIndex == lastItem) {
                console.log(accumulator, currentIndex, array.length - 1, total);
                resolve(total);
                this.totalBalance=total;
              }
            })

            return accumulator;
          });
          // console.log("Result", result);
          // return result;
        });
    });
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
    this.showModal(page,{})
  }

  showExportPrivateKeyModal(){
    let page = "PrivateKeyPasswordPage";
    this.showModal(page, {})
  }

  moreDetails(){
    let page = "WalletDetailsPage";
    this.showModal(page, { totalBalance: this.totalBalance });
  }

  showModal(page,params) {
    const modal = this.modalCtrl.create(page, params ,{
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
    let page = "TransactionDetailPage";
    this.showModal(page, tx);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  copy() {
    this.clipboard.copy(this.currentWallet.address.plain()).then(_ => {
      this.toastProvider.show('Your address has been successfully copied to the clipboard.', 3, true);
    });
  }


  doInfinite() {
    console.log('Do infinite. ');
    if (this.showEmptyMessage) return;
    this.isLoadingInfinite = true;
    this.pageable.nextPage();
    console.log('Pageable Txs: ', this.pageable);
  }

  

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
