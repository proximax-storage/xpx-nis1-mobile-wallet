import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { Clipboard } from "@ionic-native/clipboard";

import { SimpleWallet, AccountInfoWithMetaData } from "nem-library";

import { WalletProvider } from "../../../../providers/wallet/wallet";
import { NemProvider } from "../../../../providers/nem/nem";
import { ToastProvider } from "./../../../../providers/toast/toast";
import { UtilitiesProvider } from "../../../../providers/utilities/utilities";


/**
 * Generated class for the SettingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-setting-list",
  templateUrl: "setting-list.html"
})
export class SettingListPage {
  currentWallet: SimpleWallet;
  accountInfo: AccountInfoWithMetaData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nemProvider: NemProvider,
    private clipboard: Clipboard,
    private toastProvider: ToastProvider,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
  ) {}

  ionViewWillEnter() {
    this.utils.setTabIndex(0);

    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (!currentWallet) {
        this.utils.setRoot("WalletListPage");
      } else {
        this.currentWallet = currentWallet;
      }

      this.getAccountInfo();
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingListPage");
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  getAccountInfo() {
    this.nemProvider
      .getAccountInfo(this.currentWallet.address)
      .subscribe(accountInfo => {
        this.accountInfo = accountInfo;
        console.log(this.accountInfo)
      });
  }

  getQRCode() {
    let QRCode: any = this.nemProvider.generateAddressQRText(
      this.currentWallet.address
    );
    QRCode = JSON.parse(QRCode);
    QRCode.data.name = this.currentWallet.name;

    return JSON.stringify(QRCode);
  }

  copy(address: string) {
    this.clipboard.copy(address).then(_ => {
      this.toastProvider.show("Copied address successfully", 3, true);
    });
  }

  showComingSoon() {
    this.utils.showInsetModal("ComingSoonPage", {}, "small");
  }

  gotoMultisignInfoPage(){
    this.showComingSoon();
    // this.navCtrl.push('MultisignAccountInfoPage'); // Todo : Implement gotoMultisignInfoPage
  }

  gotoWalletList() {
    this.utils.setRoot('WalletListPage');
  }

  
}
