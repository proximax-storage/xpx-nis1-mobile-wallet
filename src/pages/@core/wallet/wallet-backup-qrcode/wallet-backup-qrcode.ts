import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
      this.privateKey = this.navParams.get("privateKey");
      this.QRData = this.navParams.get("QRData");
      this.showScreenshotButton = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletBackupQrcodePage');
  }

  ionViewDidEnter() {
    // Take a screenshot then go home.

  }

  dismiss() {
    return this.viewCtrl.dismiss();
  }

  takeScreenshot() {
    this.showScreenshotButton = false;
    // screenshot

    //go home
    this.dismiss().then(_=>{
      this.goHome();
    })

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
