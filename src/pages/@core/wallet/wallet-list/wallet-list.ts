import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';

import { SimpleWallet } from 'nem-library';

import { App } from '../../../../providers/app/app';
import { WalletProvider } from './../../../../providers/wallet/wallet';
import { BarcodeScannerProvider } from '../../../../providers/barcode-scanner/barcode-scanner';

/**
 * Generated class for the WalletListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletCreationType {
  SIMPLE = 0,
  PRIVATE_KEY = 1,
  QR_SCAN = 2
}

@IonicPage()
@Component({
  selector: 'page-wallet-list',
  templateUrl: 'wallet-list.html'
})
export class WalletListPage {
  App = App;

  wallets: SimpleWallet[];
  selectedWallet: SimpleWallet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public walletProvider: WalletProvider,
    public barcodeScannerProvider: BarcodeScannerProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletListPage');
  }

  ionViewWillEnter() {
    this.walletProvider.getWallets().then(value => {
      this.wallets = value;

      this.walletProvider.getSelectedWallet().then(selectedWallet => {
        this.selectedWallet = selectedWallet ? selectedWallet : this.wallets[0];
      });
    });
  }

  onWalletSelect(wallet) {
    this.selectedWallet = wallet;

    this.walletProvider.setSelectedWallet(this.selectedWallet).then(() => {
      setTimeout(() => {
        this.navCtrl.setRoot(
          'TabsPage',
          {},
          { animate: true, direction: 'forward' }
        );
      }, 100);
    });
  }

  onWalletPress(wallet) {
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
    alert.setTitle('Create new wallet');
    alert.setSubTitle('Select wallet type below');

    alert.addInput({
      type: 'radio',
      label: 'Simple wallet',
      value: WalletCreationType.SIMPLE.toString(),
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Private key wallet',
      value: WalletCreationType.PRIVATE_KEY.toString(),
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'QR scan',
      value: WalletCreationType.QR_SCAN.toString(),
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Proceed',
      handler: data => {
        if (data === WalletCreationType.SIMPLE.toString()) {
          this.navCtrl.push('WalletAddPage');
        } else if (data === WalletCreationType.PRIVATE_KEY.toString()) {
          this.navCtrl.push('WalletAddPrivateKeyPage', { name: '', privateKey: '' });
        } else if (data === WalletCreationType.QR_SCAN.toString()) {
          this.barcodeScannerProvider.getData('WalletListPage').then(data => {
            if(data) this.navCtrl.push('WalletAddPasswordConfirmationPage', data);
          });
        }
      }
    });
    alert.present();
  }

}
