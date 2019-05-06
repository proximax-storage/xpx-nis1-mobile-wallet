import { Component, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { App, NavController, NavParams, ViewController, ActionSheetController, AlertController, Platform, InfiniteScroll, ModalController, Slides, Haptic } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable, TransactionTypes, Pageable, Transaction } from 'nem-library';

import { App as AppConfig } from '../../providers/app/app';
import { WalletProvider } from '../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { GetBalanceProvider } from '../../providers/get-balance/get-balance';
import { AlertProvider } from '../../providers/alert/alert';

import { NemProvider } from '../../providers/nem/nem';
import { Observable } from 'rxjs';
import { HapticProvider } from '../../providers/haptic/haptic';


import find from 'lodash/find';
import filter from 'lodash/filter';



export enum WalletCreationType {
  NEW = 0,
  IMPORT = 1
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('itemState', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('250ms ease-out')
      ]),
      transition('* => void', [
        animate('250ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  menu = 'mosaics';
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
  showEmptyTransaction: boolean = false;
  showEmptyMosaic: boolean = false;
  isLoading: boolean = false;
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
    private modalCtrl: ModalController,
    private nemProvider: NemProvider,
    private haptic: HapticProvider
  ) {
    this.totalWalletBalance = 0;
    this.menu = "mosaics";

  }



  ionViewWillEnter() {
    console.log("1 ionViewWillEnter");
    this.utils.setHardwareBack();
    this.walletProvider.getWallets().then(wallets => {
      this.wallets = wallets


      if (this.wallets.length > 0) {
        // Show loader
        this.fakeList = [{}, {}];
        /** Transaction list business logic */
        this.unconfirmedTransactions = null;
        this.confirmedTransactions = null;
        this.isLoading = true;
        this.showEmptyTransaction = false;
        this.showEmptyMosaic = false;

        this.computeTotalWalletBalance(this.wallets);

        this.walletProvider.getSelectedWallet().then(selectedWallet => {
          console.log("Selected wallet:", selectedWallet);
          this.selectedWallet = selectedWallet ? selectedWallet : this.wallets[0];
          this.getTransactions(this.selectedWallet);
          this.getMosaicBalance(this.selectedWallet);
        }).catch(err => {
          this.selectedWallet = (!this.selectedWallet && this.wallets) ? this.wallets[0] : null;
          this.getTransactions(this.selectedWallet);
          this.getMosaicBalance(this.selectedWallet);
        });
      } else {
        this.showEmptyTransaction = true;
        this.showEmptyMosaic = true;
      }
    });


  }

  computeTotalWalletBalance(wallets: any) {
    console.log("2 computeTotalWalletBalance");
    wallets.map((wallet, index) => {
      this.getBalanceProvider.totalBalance(wallet).then(total => {
        if (wallet.name == this.selectedWallet.name) {
          this.slides.slideTo(index);
        }
        wallet.total = total;
        return wallet;
      })
    })
  }

  getTransactions(selectedWallet: SimpleWallet) {
    console.log("3 getTransactions");
    console.log("getTransactions", selectedWallet);
    this.confirmedTransactions = null;
    this.unconfirmedTransactions = null;
    this.isLoading = true;

    this.nemProvider
      .getUnconfirmedTransactions(selectedWallet.address)
      .flatMap(_ => _)
      .toArray()
      .subscribe(result => {
        this.unconfirmedTransactions = result;
      });


    this.nemProvider.getMosaicTransactions(selectedWallet.address).subscribe(mosaicTransactions => {

      console.clear();
      console.log("LOG: HomePage -> getTransactions -> mosaicTransactions", mosaicTransactions);

      let supportedMosaics = [
        { mosaicId: 'xpx' },
        { mosaicId: 'xem' },
        { mosaicId: 'npxs' },
        { mosaicId: 'sft' },
        { mosaicId: 'xar' },
      ]

      const filteredTransactions = filter(mosaicTransactions, (tx) => find(supportedMosaics, { mosaicId: tx._mosaics[0].mosaicId.name }));
      console.log("LOG: HomePage -> getTransactions -> filteredTransactions", filteredTransactions);

      setTimeout(() => {
        this.nemProvider.getXEMTransactions(selectedWallet.address).subscribe(XEMTransactions => {
          console.log("LOG: HomePage -> getTransactions -> XEMTransactions", XEMTransactions);
          this.confirmedTransactions = [].concat(filteredTransactions, XEMTransactions);

          this.isLoading = false;
          this.showEmptyTransaction = false;

          // Check transaction is empty
          if (this.confirmedTransactions.length == 0) {
            this.isLoading = false;
            this.showEmptyTransaction = true;
            this.unconfirmedTransactions = null;
          }

        })
      }, 1000);


    })

    return;
  }

  /**
   * Retrieves current account owned mosaics  into this.mosaics
   */
  public getMosaicBalance(selectedWallet: SimpleWallet) {
    console.log("4 getMosaicBalance");

    this.isLoading = true;
    this.mosaics = null; // Triggers the skeleton list loader
    this.getBalanceProvider
      .mosaics(selectedWallet.address)
      .subscribe(mosaics => {
        this.isLoading = false;
        this.mosaics = mosaics;
        if (this.mosaics.length > 0) {
          this.showEmptyMosaic = false;
          this.selectedMosaic =
            this.navParams.get('selectedMosaic') || this.mosaics[0];
        }
      });
  }



  slideChanged() {
    console.log("slideChanged");
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (this.wallets.length != currentIndex) {
      this.showEmptyTransaction = false;
      this.showEmptyMosaic = false;
      this.onWalletSelect(this.wallets[currentIndex])
      this.haptic.selection();
    } else {
      this.mosaics = null;
      this.isLoading = false;
      this.unconfirmedTransactions = null;
      this.confirmedTransactions = null;
      this.showEmptyTransaction = true;
      this.showEmptyMosaic = true;
    }
  }

  trackByName(wallet) {
    return wallet.name;
  }

  onWalletSelect(wallet) {
    console.log("On wallet select");
    this.selectedWallet = wallet;
    this.walletProvider.setSelectedWallet(this.selectedWallet).then(() => {
      this.getMosaicBalance(this.selectedWallet);
      this.getTransactions(this.selectedWallet);
    });
  }

  showWalletDetails() {
    let page = 'TransactionListPage';
    let wallet = this.selectedWallet
    wallet.walletColor = this.wallets[this.slides._activeIndex].walletColor;
    const modal = this.modalCtrl.create(page, wallet, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  onWalletPress(wallet) {
    this.haptic.impact({ style: 'heavy' });

    this.selectedWallet = wallet;

    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${wallet.name}`,
      cssClass: 'wallet-on-press',
      buttons: [
        {
          text: 'Edit',
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
            let page = "WalletDeletePage";
            this.showModal(page, { wallet: wallet });
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
    this.haptic.selection();

    let alert = this.alertCtrl.create();
    alert.setTitle('Add wallet');
    alert.setSubTitle('');

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

  public gotoWalletList() {
    this.utils.setRoot('TabsPage');
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
      // this.alertProvider.showMessage(
      //   "We're sorry but we don't have any available data for this mosaic yet."
      // );
      // return;
      coinId = '';
    }

    // this.navCtrl.push('CoinPriceChartPage', {mosaicId: mosaic, coinId: coinId});

    let page = "CoinPriceChartPage";
    const modal = this.modalCtrl.create(page, { mosaicId: mosaic, coinId: coinId, currentWallet: this.selectedWallet }, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
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
    let page = "TransactionDetailPage";
    this.showModal(page, tx);
  }

  showReceiveModal() {
    let page = "ReceivePage";

    this.showModal(page, {});
  }

  showModal(page, params) {
    const modal = this.modalCtrl.create(page, params, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async () => {
      this.mosaics = null; // Triggers the skeleton list loader
      console.log('Async operation has ended');
      try {
        await this.computeTotalWalletBalance(this.wallets);
        await this.getMosaicBalance(this.selectedWallet);
        await this.getTransactions(this.selectedWallet);
        refresher.complete();
      } catch (error) {
        this.isLoading = false;
        refresher.complete();
      }
    }, 2000);




  }
}

