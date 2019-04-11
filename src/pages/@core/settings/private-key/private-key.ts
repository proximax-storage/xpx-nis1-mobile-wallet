import { TapticEngine } from '@ionic-native/taptic-engine';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SimpleWallet } from 'nem-library';

import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

import { NemProvider } from './../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { ToastProvider } from '../../../../providers/toast/toast';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the PrivateKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private-key',
  templateUrl: 'private-key.html'
})
export class PrivateKeyPage {
  currentWallet: SimpleWallet;
  privateKey: string;
  password: string;

  QRData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public walletProvider: WalletProvider,
    private nemProvider: NemProvider,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private toastProvider: ToastProvider,
    private utils: UtilitiesProvider,
    private viewController: ViewController,
    private haptic: TapticEngine
  ) {
    this.password = this.navParams.get('password');
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);

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
        this.privateKey = this.nemProvider.passwordToPrivateKey(
          this.password,
          this.currentWallet
        );
        this.QRData = this.nemProvider.generateWalletQRText(
          this.password,
          this.currentWallet
        );
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivateKeyPage');
  }

  ionViewWillLeave() {
    this.navCtrl.popToRoot();
  }

  copy() {
    this.clipboard.copy(this.privateKey).then(_ => {
      this.haptic.notification({ type: 'success' });
      this.toastProvider.show('Copied private key successfully', 3, true);
    });
  }

  share() {
    this.haptic.notification({ type: 'success' });
    this.socialSharing
      .share(
        `Private key of ${this.currentWallet.name}: \n${this.privateKey}`,
        null,
        null,
        null
      )
      .then(_ => { });
  }

  dismiss(){
    this.viewController.dismiss();
  }
}
