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
import { ListStorageProvider } from '../../../../providers/list-storage/list-storage';

/**
 * Generated class for the NamespaceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-namespace-list',
  templateUrl: 'namespace-list.html'
})
export class NamespaceListPage {
  App = App;

  list: SimpleWallet[];
  selectedData: SimpleWallet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public walletProvider: WalletProvider,
    public barcodeScannerProvider: BarcodeScannerProvider,
    public listStorageProvider: ListStorageProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletListPage');
  }

  ionViewWillEnter() {
    this.listStorageProvider.init('namespaces');
    this.listStorageProvider.getAll().then(value => {
      this.list = value;
      this.selectedData = this.list[0];
    });
  }

  onSelect(wallet) {
    this.selectedData = wallet;
  }

  onPress(data) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${data.name}`,
      cssClass: 'wallet-on-press',
      buttons: [
        {
          text: 'Change name',
          icon: this.platform.is('ios') ? null : 'create',
          handler: () => {
            this.navCtrl.push('NamespaceUpdatePage', data);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'trash',
          handler: () => {
            this.navCtrl.push('NamespaceDeletePage', data);
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

  gotoAdd() {
    this.navCtrl.push('NamespaceCreatePage');
  }
}
