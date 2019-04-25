import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll, ViewController, ActionSheetController } from "ionic-angular";
import { CoinPriceChartProvider } from "../../../providers/coin-price-chart/coin-price-chart";
import { CoingeckoProvider } from "../../../providers/coingecko/coingecko";
import { UtilitiesProvider } from "../../../providers/utilities/utilities";
import { TransactionTypes, SimpleWallet, Transaction, Pageable, AccountInfoWithMetaData } from "nem-library";
import { NemProvider } from "../../../providers/nem/nem";
import { WalletProvider } from "../../../providers/wallet/wallet";
import { Observable } from "rxjs";
import { App } from "../../../providers/app/app";
import { Content } from 'ionic-angular';
import { GetBalanceProvider } from "../../../providers/get-balance/get-balance";
import { GetMarketPricePipe } from "../../../pipes/get-market-price/get-market-price";
import { Clipboard } from "@ionic-native/clipboard";
import { ToastProvider } from "../../../providers/toast/toast";
import { HapticProvider } from "../../../providers/haptic/haptic";
import { BrowserTab } from "@ionic-native/browser-tab";
import { SafariViewController } from "@ionic-native/safari-view-controller";

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

  accountInfo: AccountInfoWithMetaData;
  isMultisig: boolean;


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
    private toastProvider: ToastProvider,
    private actionSheetCtrl: ActionSheetController,
    private haptic: HapticProvider,
    private browserTab: BrowserTab,
    private safariViewController: SafariViewController
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
    this.currentWallet = this.navParams.data['currentWallet'];
    this.totalBalance = this.currentWallet.total;

    // console.info(this.mosaicId, this.coinId );
    this.coingeckoProvider.getDetails(this.coinId).subscribe(coin => {
      this.selectedCoin = coin;
    });

    
  }
  ionViewWillEnter() {

    /** Transaction list business logic */ 
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = false;
    this.isLoading = true;

      if (this.currentWallet) {
        this.getAccountInfo();
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
          });

        this.pageable
          .map((txs: any) => txs ? txs : Observable.empty())
          .subscribe(result => {
            this.isLoading = false;
            this.showEmptyMessage = false;
            this.confirmedTransactions = result;

            if(!this.confirmedTransactions) this.showEmptyMessage = true;
          },
            err => console.error(err),
            () => {
              this.isLoading = false;
              if (!this.confirmedTransactions) this.showEmptyMessage = true;
            });
      }
  }
  
  getAccountInfo() {
    console.info("Getting account information.", this.currentWallet.address)
    try {
      this.nemProvider
        .getAccountInfo(this.currentWallet.address)
        .subscribe(accountInfo => {
          if (accountInfo) {
            this.accountInfo = accountInfo;
            console.log("accountInfo", this.accountInfo)
            // Check if account is a cosignatory of multisig account(s)
            if (this.accountInfo.cosignatoryOf) {
              // console.clear();
              console.log("This is a multisig account");
              this.isMultisig = true;
            }
          }

        }, (err: any) => {
          console.log(err)
          this.isMultisig = false;
        });
    } catch (error) {
      console.log(error);
    }

  }

  copy() {
    this.clipboard.copy(this.currentWallet.address.plain()).then(_ => {
      this.toastProvider.show('Your address has been successfully copied to the clipboard.', 3, true);
    });
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
    console.log(this.accountInfo);

    if(this.isMultisig) {
      this.haptic.selection();
      let page = 'SendMultisigPage';

      const actionSheet = this.actionSheetCtrl.create({
        title: `Selecte transaction type`,
        cssClass: 'wallet-on-press',
        buttons: [
          {
            text: 'Normal Transaction',
            handler: () => {
              let page = 'SendPage';
              this.showModal(page,{ mosaicSelectedName: this.mosaicId})
            }
          },
          {
            text: 'Multisig Transaction',
            handler: () => {
              this.showModal(page,{ mosaicSelectedName: this.mosaicId})
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // this.showModal(page,{ mosaicSelectedName: this.mosaicId})
            }
          }
        ]
      });
      actionSheet.present();
      // this.showModal(page,{ mosaicSelectedName: this.mosaicId})
    } else {
       let page = "SendPage"; 
       this.showModal(page,{ mosaicSelectedName: this.mosaicId})
    }
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

  openLink(link){
    this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(link);
        } else {
          // open URL with InAppBrowser instead or SafariViewController

          this.safariViewController.isAvailable()
            .then((available: boolean) => {
              if (available) {

                this.safariViewController.show({
                  url: link,
                  hidden: false,
                  animated: false,
                  transition: 'curl',
                  enterReaderModeIfAvailable: true,
                  tintColor: '#ff0000'
                })
                  .subscribe((result: any) => {
                    if (result.event === 'opened') console.log('Opened');
                    else if (result.event === 'loaded') console.log('Loaded');
                    else if (result.event === 'closed') console.log('Closed');
                  },
                    (error: any) => console.error(error)
                  );

              } else {
                // use fallback browser, example InAppBrowser
              }
            }
            );
        }
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  
}
