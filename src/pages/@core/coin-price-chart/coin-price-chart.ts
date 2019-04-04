import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll, ViewController } from "ionic-angular";
import { CoinPriceChartProvider } from "../../../providers/coin-price-chart/coin-price-chart";
import { CoingeckoProvider } from "../../../providers/coingecko/coingecko";
import { UtilitiesProvider } from "../../../providers/utilities/utilities";
import { TransactionTypes, SimpleWallet, Transaction, Pageable } from "nem-library";
import { NemProvider } from "../../../providers/nem/nem";
import { WalletProvider } from "../../../providers/wallet/wallet";
import { Observable } from "rxjs";
import { App } from "../../../providers/app/app";
import { Content } from 'ionic-angular';
import { GetBalanceProvider } from "../../../providers/get-balance/get-balance";
import { GetMarketPricePipe } from "../../../pipes/get-market-price/get-market-price";
import { Clipboard } from "@ionic-native/clipboard";
import { ToastProvider } from "../../../providers/toast/toast";

/**
 * Generated class for the CoinPriceChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-coin-price-chart",
  templateUrl: "coin-price-chart.html",
  providers: [GetMarketPricePipe]
})
export class CoinPriceChartPage {
  /** Mosaic details member variables */ 
  durations: Array<{ label: string; value: number }>;
  selectedDuration: { label: string; value: number };
  selectedCoin: any;
  descriptionLength: number = 450;


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

  coinId: string;
  mosaicId: string;

  @ViewChild(InfiniteScroll)
  private infiniteScroll: InfiniteScroll;

  @ViewChild(Content) content: Content;

  selectedSegment: string = "transactions";

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
    private getBalanceProvider: GetBalanceProvider,
    private marketPrice: GetMarketPricePipe,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider
  ) {
    this.selectedSegment = 'transactions';
    this.durations = [
      { label: "24H", value: 1 },
      { label: "7D", value: 7 },
      { label: "14D", value: 365 },
      { label: "30D", value: 30 },
      { label: "6M", value: 182 }

    ];
    this.selectedDuration = this.durations[0];

    console.log("navParams.data", this.navParams.data);
    this.mosaicId = this.navParams.data['mosaicId']; // will be used to filter transactions
    this.coinId = this.navParams.data['coinId'];

    // console.info(this.mosaicId, this.coinId );
    this.coingeckoProvider.getDetails(this.coinId).subscribe(coin => {
      this.selectedCoin = coin;
    });
  }

  copy() {
    this.clipboard.copy(this.currentWallet.address.plain()).then(_ => {
      this.toastProvider.show('Your address has been successfully copied to the clipboard.', 3, true);
    });
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

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);
    
    /** Transaction list business logic */ 
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = false;
    this.isLoading = true;

    this.utils.setTabIndex(0);

    this.walletProvider.getSelectedWallet().then(currentWallet => {
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
        this.getTotalBalance(currentWallet);
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
            // this.hideInfiniteScroll();
          });

        this.pageable
          .map((txs: any) => txs ? txs : Observable.empty())
          .subscribe(result => {

            if(!this.confirmedTransactions) this.showEmptyMessage = false;

            if (this.isLoadingInfinite) {
              this.isLoadingInfinite = false;
              // this.hideInfiniteScroll();
              if(this.confirmedTransactions!=null) this.confirmedTransactions.push(...result);
            }

            this.isLoading = false;
            this.confirmedTransactions = result;
            // this.showInfiniteScroll();
          },
            err => console.error(err),
            () => {
              this.isLoading = false;
              if (!this.confirmedTransactions) this.showEmptyMessage = true;
              // this.hideInfiniteScroll();
            });
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CoinPriceChartPage");
  }

  select(duration) {
    this.selectedDuration = duration;
    this.coinPriceChartProvider.load(
      this.selectedCoin,
      this.selectedDuration.value,
      "usd"
    );
  }

  readMore(descriptionLength) {
    this.descriptionLength =
      descriptionLength === this.descriptionLength ? 450 : descriptionLength;
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  showReceiveModal() {
    let page = "ReceivePage";
    this.showModal(page, {});
  }

  showSendModal() {
    let page = "SendPage";
    this.showModal(page, this.mosaicId);
  }

  showModal(page,params) {
    const modal = this.modalCtrl.create(page, params ,{
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  gotoTransactionDetail(tx) {
    let page = "TransactionDetailPage";
    this.showModal(page, tx);
  }

  /** Transaction list methods */
  trackByHash(index) {
    return index;
  }



  // doInfinite() {
  //   if (this.showEmptyMessage) return;
    
  //   this.isLoadingInfinite = true;
  //   this.pageable.nextPage();
  //   console.log('Pageable Txs: ', this.pageable);
  // }

  // showInfiniteScroll(){
  //   if(this.infiniteScroll) {
  //     this.infiniteScroll.enable(true);;
  //   }
  // }

  // hideInfiniteScroll() {
  //   if(this.infiniteScroll) {
  //     this.infiniteScroll.complete();
  //     this.infiniteScroll.enable(false);
  //   }
  // }

  openLink(link){
    window.open(link,'_system', 'location=yes');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
