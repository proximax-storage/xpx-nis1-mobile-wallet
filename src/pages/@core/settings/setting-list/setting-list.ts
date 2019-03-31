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
    // this.utils.setTabIndex(0);

    // this.walletProvider.getSelectedWallet().then(currentWallet => {
    //   if (!currentWallet) {
    //     this.utils.setRoot("WalletListPage");
    //   } else {
    //     this.currentWallet = currentWallet;
    //     this.getAccountInfo();
    //   }


    // });
  }

  // getAccountInfo() {
  //   this.nemProvider
  //     .getAccountInfo(this.currentWallet.address)
  //     .subscribe(accountInfo => {
  //       this.accountInfo = accountInfo;
  //       console.log(this.accountInfo)
  //     });
  // }


  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingListPage");
  }

  goto(page) {
    this.navCtrl.push(page);
  }

  gotoGuide() {
    this.navCtrl.push('OnboardingPage', {preview: true});
  }
  

  gotoMultisignInfoPage(){
    this.showComingSoon();
    // this.navCtrl.push('MultisignAccountInfoPage'); // Todo : Implement gotoMultisignInfoPage
  }

  showComingSoon() {
    this.utils.showInsetModal("ComingSoonPage", {}, "small");
  }

  logOut() {
    this.utils.setRoot('WelcomePage');
  }

  
}
