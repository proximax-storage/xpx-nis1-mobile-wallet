import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SimpleWallet } from 'nem-library';

import { App } from './../../../../providers/app/app';
import { WalletBackupProvider } from '../../../../providers/wallet-backup/wallet-backup';
import { SocialSharing } from '../../../../../node_modules/@ionic-native/social-sharing';
import { AuthProvider } from '../../../../providers/auth/auth';
import { NemProvider } from '../../../../providers/nem/nem';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
/**
 * Generated class for the WalletBackupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletBackupType {
  EXPORT_AS_FILE = 0,
  SHARE = 1,
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
  showBackupfile: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private walletBackupProvider: WalletBackupProvider,
    private nemProvider: NemProvider,
    private socialSharing: SocialSharing,
    private utils: UtilitiesProvider,
    private platform: Platform
  ) {

    if(this.platform.is("ios")){
      this.showBackupfile = false;
    }
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBackupPage');

    this.utils.setHardwareBack(this.navCtrl);
  }

  ionViewDidLeave() {
    this.navCtrl.popToRoot();
  }

  init() {
    this.options = [
      {
        name: 'Copy to clipboard',
        value: WalletBackupType.COPY_TO_CLIPBOARD,
        icon: 'ios-copy-outline'
      },
      {
        name: 'Share',
        value: WalletBackupType.SHARE,
        icon: 'ios-share-outline'
      }
    ];

    if(this.showBackupfile) {
      this.options.push({
        name: 'Export as file', // TODO
        value: WalletBackupType.EXPORT_AS_FILE,
        icon: 'ios-folder-outline'
      });
    }
  }

  onSelect(option) {
    this.selectedOption = option.value;

    this.onSubmit();
  }

  goHome() {
    this.navCtrl.setRoot(
      'TabsPage',
      {},
      {
        animate: true
      }
    );
  }

   onSubmit() {
    const WALLET: SimpleWallet = <SimpleWallet>this.navParams.data;

    if (this.selectedOption === WalletBackupType.EXPORT_AS_FILE) {
      // TODO: export as .wlt file
      this.walletBackupProvider.saveAsFile(WALLET).then(_ => {
        this.goHome();
      });
    } else if (this.selectedOption === WalletBackupType.SHARE) {
      // TODO: save to Google drive
      this.authProvider.getPassword().then(async password => {
        const privateKey = await this.nemProvider.passwordToPrivateKey(
          password,
          WALLET
        );

        this.socialSharing.share(
          privateKey,
          null,
          null,
          null
        );
      });
    } else if (this.selectedOption === WalletBackupType.COPY_TO_CLIPBOARD) {
      // TODO: copy to clipbboard
      this.walletBackupProvider.copyToClipboard(WALLET).then(_ => {
        this.goHome();
      });
    }
  }
}
