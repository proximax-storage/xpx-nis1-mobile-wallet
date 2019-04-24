import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Haptic } from 'ionic-angular';
import { HapticProvider } from '../../../../providers/haptic/haptic';
import { Clipboard } from '@ionic-native/clipboard';
import { ToastProvider } from '../../../../providers/toast/toast';


/**
 * Generated class for the WalletBackupQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-backup-qrcode',
  templateUrl: 'wallet-backup-qrcode.html',
})
export class WalletBackupQrcodePage {

  privateKey: string;
  QRData: string;
  showScreenshotButton: boolean;
  walletName: string;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private haptic: HapticProvider,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider
    ) {
      this.privateKey = this.navParams.get("privateKey");
      this.QRData = this.navParams.get("QRData");
      this.walletName = this.navParams.get("walletName");
      this.showScreenshotButton = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBackupQrcodePage');
  }

  ionViewDidEnter() {
    // Take a screenshot then go home.
  }

  dismiss() {
     this.viewCtrl.dismiss(); 
     this.goHome();
  }

  copy() {
    this.clipboard.copy(this.privateKey).then(_ => {
      this.haptic.notification({ type: 'success' });
      this.toastProvider.show('Copied private key successfully', 3, true);
      this.dismiss();
    });
  }


  goHome() {
    this.navCtrl.setRoot(
      'TabsPage',
      {
        animate: true
      }
    );
  }

}
