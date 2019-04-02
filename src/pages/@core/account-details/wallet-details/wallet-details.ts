import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AccountInfoWithMetaData, SimpleWallet } from 'nem-library';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { NemProvider } from '../../../../providers/nem/nem';
import { Clipboard } from '@ionic-native/clipboard';
import { ToastProvider } from '../../../../providers/toast/toast';

/**
 * Generated class for the WalletDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-details',
  templateUrl: 'wallet-details.html',
})
export class WalletDetailsPage {
  accountInfo: AccountInfoWithMetaData;
  currentWallet: SimpleWallet;
  walletName:string='';
  totalBalance: number;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private walletProvider: WalletProvider,
    private nemProvider: NemProvider,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController
    ) {
      this.totalBalance = navParams.get('totalBalance');
    
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      this.walletName = currentWallet.name;
      this.currentWallet = currentWallet;
      this.getAccountInfo();
  });
}

getAccountInfo() {
  this.nemProvider
    .getAccountInfo(this.currentWallet.address)
    .subscribe(accountInfo => {
      this.accountInfo = accountInfo;
      console.log(this.accountInfo)
    });
}

copy() {
  this.clipboard.copy(this.currentWallet.address.plain()).then(_ => {
    this.toastProvider.show('Your address has been successfully copied to the clipboard.', 3, true);
  });
}

dismiss() {
  this.viewCtrl.dismiss();
}

showWalletUpdate(){
  let page = "WalletUpdatePage";
  this.showModal(page, { wallet: this.currentWallet });
}

showModal(page,params) {
  const modal = this.modalCtrl.create(page, params ,{
    enableBackdropDismiss: false,
    showBackdrop: true
  });
  modal.present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletDetailsPage');
  }

}
