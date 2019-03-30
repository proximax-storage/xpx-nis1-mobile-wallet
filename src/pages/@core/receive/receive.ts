import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastProvider } from '../../../providers/toast/toast';
import { WalletProvider } from '../../../providers/wallet/wallet';
import { SimpleWallet } from 'nem-library';
 /*
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html'
})
export class ReceivePage {
  currentWallet: SimpleWallet;
  address:string;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private toastProvider: ToastProvider,
    private walletProvider: WalletProvider,
  ) {
  }
  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivePage');
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
        this.address = this.getQRCode();
      }
      
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getQRCode() {
    return this.currentWallet.address.plain().toString();
  }

  copy() {
    this.clipboard.copy(this.getQRCode()).then(_ => {
      this.toastProvider.show('Your address has been successfully copied to the clipboard.', 3, true);
    });
  }

  share() {
    this.socialSharing
      .share(
        this.getQRCode(),
        null,
        null,
        null
      )
      .then(_ => { });
  }
}
