import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimpleWallet } from 'nem-library';

import { App } from './../../../../providers/app/app';
import { WalletBackupProvider } from '../../../../providers/wallet-backup/wallet-backup';
/**
 * Generated class for the WalletBackupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletBackupType {
  EXPORT_AS_FILE = 0,
  GOOGLE_DRIVE = 1,
  COPY_TO_CLIPBOARD = 2
}

@IonicPage()
@Component({
  selector: 'page-wallet-backup',
  templateUrl: 'wallet-backup.html'
})
export class WalletBackupPage {
  App = App;

  options: Array<{
    name: string;
    value: number;
    icon: string;
  }>;
  selectedOption: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private walletBackupProvider: WalletBackupProvider,
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBackupPage');
  }

  ionViewDidLeave() {
    this.navCtrl.popToRoot();
  }

  init() {
    this.options = [
      {
        name: 'Export as file',
        value: WalletBackupType.EXPORT_AS_FILE,
        icon: 'folder',
      },
      {
        name: 'Save to google drive',
        value: WalletBackupType.GOOGLE_DRIVE,
        icon: 'cloud-upload',
      },
      {
        name: 'Copy to clipboard',
        value: WalletBackupType.COPY_TO_CLIPBOARD,
        icon: 'copy',
      }
    ];
  }

  onSelect(option) {
    this.selectedOption = option.value;

    this.onSubmit();
  }

  goHome() {
    this.navCtrl.setRoot('TabsPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSubmit() {
    const WALLET: SimpleWallet = <SimpleWallet> this.navParams.data;

    if (this.selectedOption === WalletBackupType.EXPORT_AS_FILE) {
      // TODO: export as .wlt file
      this.walletBackupProvider.saveAsFile(WALLET).then(_ => {
        this.goHome();
      });
    } else if (this.selectedOption === WalletBackupType.GOOGLE_DRIVE) {
      // TODO: save to Google drive
      this.walletBackupProvider.saveToGoogleDrive(WALLET).then(_ => {
        this.goHome();
      });
    } else if (this.selectedOption === WalletBackupType.COPY_TO_CLIPBOARD) {
      // TODO: copy to clipbboard
      this.walletBackupProvider.copyToClipboard(WALLET).then(_ => {
        this.goHome();
      });
    }
  }
}
