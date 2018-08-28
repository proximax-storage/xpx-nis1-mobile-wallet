import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController
} from "ionic-angular";

import { SimpleWallet, MosaicDefinition } from "nem-library";

import { App } from "../../../../../providers/app/app";
import { WalletProvider } from "../../../../../providers/wallet/wallet";
import { NemProvider } from "../../../../../providers/nem/nem";
import { UtilitiesProvider } from "../../../../../providers/utilities/utilities";

/**
 * Generated class for the MosaicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mosaic-list",
  templateUrl: "mosaic-list.html"
})
export class MosaicListPage {
  App = App;

  currentWallet: SimpleWallet;
  selectedData: MosaicDefinition;

  mosaics: MosaicDefinition[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public walletProvider: WalletProvider,
    public nemProvider: NemProvider,
    public utils: UtilitiesProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad WalletListPage");
  }

  ionViewWillEnter() {
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (!currentWallet) {
        this.utils.setRoot("WalletListPage");
      } else {
        this.currentWallet = currentWallet;
      }

      this.nemProvider
        .getMosaicsOwned(this.currentWallet.address)
        .subscribe(mosaics => {
          this.mosaics = mosaics;
          this.selectedData = mosaics[0];
        });
    });
  }

  onSelect(mosaics) {
    this.selectedData = mosaics;
  }

  onPress(data) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${data.id.name}`,
      cssClass: "wallet-on-press",
      buttons: [
        {
          text: "Edit supply",
          icon: this.platform.is("ios") ? null : "create",
          handler: () => {
            this.navCtrl.push("NamespaceUpdatePage", data);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          icon: this.platform.is("ios") ? null : "close",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  gotoAdd() {
    this.navCtrl.push("MosaicCreatePage");
  }
}
