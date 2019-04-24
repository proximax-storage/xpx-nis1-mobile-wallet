import { AuthProvider } from './../../../../providers/auth/auth';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App, ModalController, AlertController, Platform } from "ionic-angular";
import { Clipboard } from "@ionic-native/clipboard";

import { SimpleWallet, AccountInfoWithMetaData } from "nem-library";

import { WalletProvider } from "../../../../providers/wallet/wallet";
import { NemProvider } from "../../../../providers/nem/nem";
import { ToastProvider } from "./../../../../providers/toast/toast";
import { UtilitiesProvider } from "../../../../providers/utilities/utilities";
import { AppVersion } from '@ionic-native/app-version';
import { HapticProvider } from '../../../../providers/haptic/haptic';


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
  version: string = '0.0.1';
  buildNumber: any = '10';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private walletProvider: WalletProvider,
    private utils: UtilitiesProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private haptic: HapticProvider,
    private appVersion: AppVersion,
    private platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.appVersion.getVersionNumber().then(version=> {
        this.version = version || '0.0.1';
      }).then(_=> {
        this.appVersion.getVersionCode().then(build=>{
          this.buildNumber = build || '10';
        })
      })
    }
  }

  ionViewWillEnter() {
    // this.utils.setTabIndex(0);
    // this.walletProvider.getWallets().then(wallets=> {
    //   if (wallets) {
    //     this.walletProvider.getSelectedWallet().then(currentWallet => {
    //       if (currentWallet) {
    //         this.currentWallet = currentWallet;
    //       }
    //     })
    //   }
    // })

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

  gotoAccountDetails() {
    let page = 'AccountDetailsPage';
    const modal = this.modalCtrl.create(page, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });
    modal.present();
  }

  resetPIN() {
    // Reset pin first.
    this.utils.showModal('VerificationCodePage', { status: 'setup', destination: 'TabsPage' });
  }

  showResetPINPrompt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Reset PIN');
    alert.setSubTitle('Are you sure you want to reset your PIN?');
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Yes',
      handler: data => {
        this.resetPIN();
      }
    });

    alert.present();
  }

  gotoGuide() {
    this.navCtrl.push('OnboardingPage', { preview: true });
  }


  gotoMultisignInfoPage() {
    this.showComingSoon();
    // this.navCtrl.push('MultisignAccountInfoPage'); // Todo : Implement gotoMultisignInfoPage
  }

  showComingSoon() {
    this.utils.showInsetModal("ComingSoonPage", {}, "small");
  }

  // backupWallet() {
  //   this.navCtrl.push('WalletBackupPage', this.currentWallet);
  // }

  logOut() {
    this.authProvider.logout().then(_ => {
      this.haptic.selection();
      console.log("Logging out", _);
      // this.utils.setTabIndex(0);
      this.utils.setHardwareBackToPage("LoginPage");
      this.utils.setHardwareBack();
      this.utils.setRoot('LoginPage');
    })
  }
}
