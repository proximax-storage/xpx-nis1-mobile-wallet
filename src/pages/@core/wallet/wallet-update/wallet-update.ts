import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SimpleWallet } from 'nem-library';

import { App } from '../../../../providers/app/app';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { AuthProvider } from '../../../../providers/auth/auth';
import { AlertProvider } from '../../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the WalletUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-update',
  templateUrl: 'wallet-update.html'
})
export class WalletUpdatePage {
  App = App;
  formGroup: FormGroup;
  selectedWallet: SimpleWallet;

  PASSWORD: string;

  walletColor:string = "wallet-1";
  walletName: string = "MyWallet";
  walletAddress: string = "TDDG3UDZBGZUIOCDCOPT45NB7C7VJMPMMNWVO4MH";
  walletTotal:number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private walletProvider: WalletProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private utils: UtilitiesProvider,
    private viewCtrl: ViewController,
  ) {
    //this.walletColor = "wallet-1"; // to be change with current wallet color
    this.init();
  }

  changeWalletColor(color){
    this.walletColor = color;
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletUpdatePage');
  }

  init() {
    this.selectedWallet = this.navParams.get('wallet');
    this.walletColor = this.selectedWallet.walletColor;
    this.walletName = this.selectedWallet.name;
    this.walletAddress = this.selectedWallet.address.plain()
    this.walletTotal = this.selectedWallet.total;

    console.log("Total", this.walletTotal);

    this.formGroup = this.formBuilder.group({
      name: [
        this.selectedWallet.name || '',
        [Validators.minLength(3), Validators.required]
      ]
    });

    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  goBack() {
    return this.navCtrl.setRoot(
      'TabsPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    this.walletProvider.checkIfWalletNameExists(form.name).then(value => {
      if (value) {
        this.alertProvider.showMessage('This wallet name already exists. Please try again.');
      } else {
        this.walletProvider
          .updateWalletName(this.selectedWallet, form.name, this.walletColor)
          .then(selectedWallet => {
            console.log(selectedWallet);
            return this.walletProvider.setSelectedWallet(selectedWallet.wallet);
          })
          .then(selectedWallet => {
            this.goBack();
          });
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}
