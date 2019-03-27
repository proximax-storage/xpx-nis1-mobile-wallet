import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, ViewController, ActionSheetController, AlertController, Platform, InfiniteScroll, ModalController } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable, TransactionTypes, Pageable, Transaction } from 'nem-library';

import { App as AppConfig } from '../../providers/app/app';
import { WalletProvider } from '../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { GetBalanceProvider } from '../../providers/get-balance/get-balance';
import { AlertProvider } from '../../providers/alert/alert';
import sortBy from 'lodash/sortBy';
import { GetMarketPricePipe } from '../../pipes/get-market-price/get-market-price';
import { NemProvider } from '../../providers/nem/nem';
import { Observable } from 'rxjs';


export enum WalletCreationType {
  NEW = 0,
  IMPORT = 1
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GetMarketPricePipe]
})
export class HomePage {
  menu='mosaics';
  AppConfig = AppConfig;
  selectedMosaic: MosaicTransferable;
  mosaics: Array<MosaicTransferable>;
  wallets: SimpleWallet[];
  selectedWallet: SimpleWallet;
  fakeList: Array<any>;
  data: any[] = [];
  totalWalletBalance = 0;

  /** Transaction list member variables */
  App = App;
  TransactionTypes = TransactionTypes;
  currentWallet: SimpleWallet;
  // TransactionfakeList: Array<any>;
  unconfirmedTransactions: Array<any>;
  confirmedTransactions: Array<any>;
  showEmptyMessage: boolean;
  isLoading: boolean;
  isLoadingInfinite: boolean = false;
  pageable: Pageable<Transaction[]>;
  @ViewChild(InfiniteScroll)
  private infiniteScroll: InfiniteScroll;

  

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public getBalanceProvider: GetBalanceProvider,
    public alertProvider: AlertProvider,
    public walletProvider: WalletProvider,
    public utils: UtilitiesProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public platform: Platform,
    private marketPrice: GetMarketPricePipe,
    // public coingeckoProvider: CoingeckoProvider,
    // public coinPriceChartProvider: CoinPriceChartProvider,
    private modalCtrl: ModalController,
    private nemProvider: NemProvider
  ) {
    this.fakeList = [{}, {}];
    this.totalWalletBalance = 0;
    this.menu="mosaics";
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.mosaics = null; // Triggers the skeleton list loader

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getBalance();
      refresher.complete();
    }, 1000);
  }

  ionViewWillEnter() {

    this.utils.setHardwareBack();
    this.walletProvider.getWallets().then(value => {
      this.wallets = sortBy(value, 'name');

      var wlts = this.wallets.map((wallet)=>{
        this.getTotalBalance(wallet).then(total=> {
          // return Object.assign(wallet, {total:total});
          wallet.total =  total;
          return wallet;
        })
      })

      console.info("Wallets", wlts);
      this.walletProvider.getSelectedWallet().then(selectedWallet => {
        this.selectedWallet = selectedWallet ? selectedWallet : this.wallets[0];
        this.getBalance();
      }).catch(err => {
        this.selectedWallet = (!this.selectedWallet && this.wallets) ? this.wallets[0] : null;
        this.getBalance();
      });
    });

    /** Transaction list business logic */
    this.unconfirmedTransactions = null;
    this.confirmedTransactions = null;
    this.showEmptyMessage = false;
    this.isLoading = true;

    // this.utils.setTabIndex(0);

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
            this.hideInfiniteScroll();
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
              this.hideInfiniteScroll();
              if(this.confirmedTransactions!=null) this.confirmedTransactions.push(...result);

            }

            this.isLoading = false;
            this.confirmedTransactions = result;
            // this.infiniteScroll.enable(true);
            this.showInfiniteScroll();
          },
            err => console.error(err),
            () => {
              this.isLoading = false;
              if (!this.confirmedTransactions) this.showEmptyMessage = true;
              this.hideInfiniteScroll();
            });
      }
    });
  }



  trackByName(wallet) {
    return wallet.name;
  }

  onWalletSelect(wallet) {
    console.log(wallet);
    this.mosaics = null; // Triggers the skeleton list loader
    this.selectedWallet = wallet;

    this.walletProvider.setSelectedWallet(this.selectedWallet).then(() => {
      this.getBalance();
    });
  }

  onWalletPress(wallet) {
    this.selectedWallet = wallet;

    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${wallet.name}`,
      cssClass: 'wallet-on-press',
      buttons: [
        {
          text: 'Change name',
          icon: this.platform.is('ios') ? null : 'create',
          handler: () => {
            this.navCtrl.push('WalletUpdatePage', { wallet: wallet });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'trash',
          handler: () => {
            this.navCtrl.push('WalletDeletePage', { wallet: wallet });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: this.platform.is('ios') ? null : 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showAddWalletPrompt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Add wallet');
    alert.setSubTitle('Select wallet type below');

    alert.addInput({
      type: 'radio',
      label: 'New wallet',
      value: WalletCreationType.NEW.toString(),
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Import wallet',
      value: WalletCreationType.IMPORT.toString(),
      checked: false
    });

    alert.addButton('Cancel');

    alert.addButton({
      text: 'Proceed',
      handler: data => {
        if (data === WalletCreationType.NEW.toString()) {
          this.navCtrl.push('WalletAddPage');
        } else if (data === WalletCreationType.IMPORT.toString()) {
          this.navCtrl.push("WalletAddPrivateKeyPage", {
            name: "",
            privateKey: ""
          });
        }
      }
    });

    alert.present();
  }




  /**
   * Retrieves current account owned mosaics  into this.mosaics
   */
  public getBalance() {
    this.getBalanceProvider
      .mosaics(this.selectedWallet.address)
      .subscribe(mosaics => {
        this.mosaics = mosaics;

        if (this.mosaics.length > 0) {
          this.selectedMosaic =
            this.navParams.get('selectedMosaic') || this.mosaics[0];
        }
      });
  }

   getTotalBalance(wallet: SimpleWallet): Promise<number> {
    return new Promise((resolve) => {
      this.getBalanceProvider
          .mosaics(wallet.address)
          .subscribe(mosaics => {
            this.mosaics = mosaics;
            let total = 0;
    
            this.mosaics.reduce((accumulator, mosaic, currentIndex, array) => {
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
                }
              })

              return accumulator;
            });
            // console.log("Result", result);
            // return result;
          });
    });
}
  public gotoWalletList() {
    this.utils.setRoot('WalletListPage');
  }

  public gotoCoinPrice(mosaic) {

    let coinId = '';

    if (mosaic === 'xem') {
      coinId = 'nem';
    }
    else if (mosaic === 'xpx') {
      coinId = 'proximax';
    } else if (mosaic === 'npxs') {
      coinId = 'pundi-x';
    } else {
      this.alertProvider.showMessage(
        "We're sorry but we don't have any available data for this mosaic yet."
      );
      return;
    }

    this.navCtrl.push('CoinPriceChartPage', {mosaicId: mosaic, coinId: coinId});
  }

  public getPriceInUSD(amount, marketPrice) {
    let result = amount * marketPrice;
    this.totalWalletBalance += result

    return result;
  }

  /** Transaction list methods */
  trackByHash(index) {
    return index;
  }

  gotoTransactionDetail(tx) {
    this.navCtrl.push('TransactionDetailPage', tx);
  }

  doInfinite() {
    if (this.showEmptyMessage) return;
    
    this.isLoadingInfinite = true;
    this.pageable.nextPage();
    console.log('Pageable Txs: ', this.pageable);
  }

  showInfiniteScroll(){
    if(this.infiniteScroll) {
      this.infiniteScroll.enable(true);;
    }
  }

  hideInfiniteScroll() {
    if(this.infiniteScroll) {
      this.infiniteScroll.complete();
      this.infiniteScroll.enable(false);
    }
  }

  showReceiveModal() {
    let page = "ReceivePage";
    const modal = this.modalCtrl.create(page, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }
}
