import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable } from 'nem-library';

import { App as AppConfig } from '../../providers/app/app';
import { WalletProvider } from '../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { GetBalanceProvider } from '../../providers/get-balance/get-balance';
import { AlertProvider } from '../../providers/alert/alert';
import sortBy from 'lodash/sortBy';
import { GetMarketPricePipe } from '../../pipes/get-market-price/get-market-price';


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
  AppConfig = AppConfig;

  selectedMosaic: MosaicTransferable;
  mosaics: Array<MosaicTransferable>;

  wallets: SimpleWallet[];
  selectedWallet: SimpleWallet;

  fakeList: Array<any>;

  data: any[] = [];
  totalWalletBalance = 0;

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
    private marketPrice: GetMarketPricePipe
  ) {
    this.fakeList = [{}, {}];
    this.totalWalletBalance = 0;
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
          this.navCtrl.push('WalletImportOptionPage');
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
}
