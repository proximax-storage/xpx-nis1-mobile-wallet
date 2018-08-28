import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController
} from "ionic-angular";

import { SimpleWallet, Namespace } from "nem-library";

import { App } from "../../../../providers/app/app";
import { WalletProvider } from "./../../../../providers/wallet/wallet";
import { BarcodeScannerProvider } from "../../../../providers/barcode-scanner/barcode-scanner";
import { NemProvider } from "../../../../providers/nem/nem";
import { UtilitiesProvider } from "../../../../providers/utilities/utilities";

/**
 * Generated class for the NamespaceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-namespace-list",
  templateUrl: "namespace-list.html"
})
export class NamespaceListPage {
  App = App;

  currentWallet: SimpleWallet;
  selectedData: Namespace;

  namespaces: Namespace[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public walletProvider: WalletProvider,
    public barcodeScannerProvider: BarcodeScannerProvider,
    public nemProvider: NemProvider,
    public utils: UtilitiesProvider,
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
        .getNamespacesOwned(this.currentWallet.address)
        .subscribe(namespaces => {
          this.namespaces = namespaces;
          this.selectedData = namespaces[0];
        });
    });
  }

  onSelect(namespace) {
    this.selectedData = namespace;
  }

  onPress(data) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${data.name}`,
      cssClass: "wallet-on-press",
      buttons: [
        {
          text: "Change name",
          icon: this.platform.is("ios") ? null : "create",
          handler: () => {
            this.navCtrl.push("NamespaceUpdatePage", data);
          }
        },
        {
          text: "Delete",
          role: "destructive",
          icon: this.platform.is("ios") ? null : "trash",
          handler: () => {
            this.navCtrl.push("NamespaceDeletePage", data);
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
    this.navCtrl.push("NamespaceCreatePage");
  }
}
