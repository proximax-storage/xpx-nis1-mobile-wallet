import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll } from "ionic-angular";
import { CoinPriceChartProvider } from "../../../providers/coin-price-chart/coin-price-chart";
import { CoingeckoProvider } from "../../../providers/coingecko/coingecko";
import { UtilitiesProvider } from "../../../providers/utilities/utilities";
import { TransactionTypes, SimpleWallet, Transaction, Pageable } from "nem-library";
import { NemProvider } from "../../../providers/nem/nem";
import { WalletProvider } from "../../../providers/wallet/wallet";
import { Observable } from "rxjs";
import { App } from "../../../providers/app/app";

/**
 * Generated class for the CoinPriceChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-coin-price-chart",
  templateUrl: "coin-price-chart.html"
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public coingeckoProvider: CoingeckoProvider,
    public coinPriceChartProvider: CoinPriceChartProvider,
    public utils: UtilitiesProvider,
    private modalCtrl: ModalController,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider
  ) {
    this.durations = [
      { label: "1D", value: 1 },
      { label: "7D", value: 7 },
      { label: "30D", value: 30 },
      { label: "6M", value: 182 },
      { label: "1Y", value: 365 }
    ];
    this.selectedDuration = this.durations[0];

    console.log("navParams.data", this.navParams.data);
    this.mosaicId = this.navParams.data['mosaicId'];
    this.coinId = this.navParams.data['coinId'];

    console.info(this.mosaicId, this.coinId );
    this.coingeckoProvider.getDetails(this.coinId).subscribe(coin => {
      this.selectedCoin = coin;
      this.select(this.selectedDuration);
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

  doInfinite() {
    if (!this.showEmptyMessage) return;
    this.isLoadingInfinite = true;
    this.pageable.nextPage();
    console.log('Pageable Txs: ', this.pageable);
  }
}
