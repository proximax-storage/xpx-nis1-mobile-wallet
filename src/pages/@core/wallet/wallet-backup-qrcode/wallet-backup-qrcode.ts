import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Screenshot } from '@ionic-native/screenshot';


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
    private screenshot: Screenshot
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
    return this.viewCtrl.dismiss();
  }

  async takeScreenshot() {
    this.showScreenshotButton = false;

    // Take a screenshot and save to file
    this.screenshot.save('jpg', 80, `${this.walletName}`).then(res=> {
      console.log(res);
      alert(res);
    }).catch(err=>{
      alert(err);
    })

   

    //Go home
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
