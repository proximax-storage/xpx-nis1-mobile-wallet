import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { SimpleWallet } from 'nem-library';

import { App } from './../../../../providers/app/app';
import { WalletBackupProvider } from '../../../../providers/wallet-backup/wallet-backup';
import { SocialSharing } from '../../../../../node_modules/@ionic-native/social-sharing';
import { AuthProvider } from '../../../../providers/auth/auth';
import { NemProvider } from '../../../../providers/nem/nem';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { of } from 'rxjs/observable/of';
/**
 * Generated class for the WalletBackupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletBackupType {
  EXPORT_AS_FILE = 0,
  SHARE = 1,
  COPY_TO_CLIPBOARD = 2,
  QR_CODE = 3
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
  privateKey: string;
  QRData: string;
  currentWallet: SimpleWallet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private walletBackupProvider: WalletBackupProvider,
    private nemProvider: NemProvider,
    private socialSharing: SocialSharing,
    private utils: UtilitiesProvider,
    private platform: Platform,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController
  ) {


    this.init();
  }

  ionViewWillEnter() {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBackupPage');

    this.utils.setHardwareBack(this.navCtrl);
    this.currentWallet = <SimpleWallet>this.navParams.data;
    if (this.currentWallet) {

      this.authProvider
        .getPassword()
        .then(password => {
          this.QRData = this.nemProvider.generateWalletQRText(password, this.currentWallet);
          this.privateKey = this.nemProvider.passwordToPrivateKey(
            password,
            this.currentWallet
          );
        });
    }
  }

  ionViewDidLeave() {
    this.navCtrl.popToRoot();
  }

  init() {
      this.options = [
        {
          name: 'Export via QR Code', // TODO
          value: WalletBackupType.QR_CODE,
          icon: 'ios-barcode-outline'
        },
        
        {
          name: 'Copy Private Key',
          value: WalletBackupType.COPY_TO_CLIPBOARD,
          icon: 'ios-copy-outline'
        },
        {
          name: 'Export Private Key',
          value: WalletBackupType.SHARE,
          icon: 'ios-share-outline'
        }
      ];
  }



  goHome() {
    this.navCtrl.setRoot(
      'TabsPage',
      {
        animate: true
      }
    );
  }

  onSelect(option) {
    this.selectedOption = option.value;

    this.onSubmit();
  }

  onSubmit() {
    const WALLET: SimpleWallet = <SimpleWallet>this.navParams.data;
    if (this.selectedOption === WalletBackupType.SHARE) {
      this.authProvider.getPassword().then(async password => {
        const privateKey = await this.nemProvider.passwordToPrivateKey(password, WALLET);
        await this.socialSharing.share(
          privateKey, null, null);
        this.goHome();
      });
    }
    else if (this.selectedOption === WalletBackupType.COPY_TO_CLIPBOARD) {
      this.walletBackupProvider.copyToClipboard(WALLET).then(_ => {
        this.goHome();
      });
    } else if (this.selectedOption === WalletBackupType.QR_CODE) {
      this.gotoQRCodePage();
    }
  }

  gotoQRCodePage() {
    let page = "WalletBackupQrcodePage";
    const modal = this.modalCtrl.create(page, {QRData:this.QRData, privateKey: this.privateKey, walletName: this.currentWallet.name } ,{
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
