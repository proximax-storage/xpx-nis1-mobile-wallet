import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { NemProvider } from '../../../../providers/nem/nem';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { AuthProvider } from '../../../../providers/auth/auth';
import { AlertProvider } from '../../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { scan } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the WalletAddPrivateKeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-add-private-key',
  templateUrl: 'wallet-add-private-key.html'
})
export class WalletAddPrivateKeyPage {
  App = App;
  formGroup: FormGroup;

  PASSWORD: string;

  walletColor: string = "wallet-1";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertProvider: AlertProvider,
    private nemProvider: NemProvider,
    private walletProvider: WalletProvider,
    private authProvider: AuthProvider,
    private utils: UtilitiesProvider,
    private barcodeScanner : BarcodeScanner,
    private alertCtrl: AlertController,
  ) {
    this.walletColor = 'wallet-1';
    this.init();
  }

  changeWalletColor(color) {
    this.walletColor = color;
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      privateKey: ['', [Validators.minLength(3), Validators.required]]
    });

    if (this.navParams.data) {
      this.formGroup.setValue(this.navParams.data);
    }

    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  gotoBackup(wallet) {
    return this.navCtrl.push('WalletBackupPage', wallet);
  }

  onSubmit(form) {
    try {
      const newWallet = this.nemProvider.createPrivateKeyWallet(
        form.name,
        this.PASSWORD,
        form.privateKey
      );

      this.walletProvider.checkIfWalletNameExists(newWallet.name).then(value => {
        if (value) {
          this.alertProvider.showMessage('This wallet name already exists. Please try again.');
        } else {

          this.walletProvider
            .storeWallet(newWallet, this.walletColor)
            .then(_ => {
              return this.walletProvider.setSelectedWallet(newWallet);
            }).then(_ => {
              this.gotoBackup(newWallet);
            });

        }


      });
    }
    catch (error) {
      this.alertProvider.showMessage(error);
    }
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let password: string;
      let payload = JSON.parse(barcodeData.text);


      let alert = this.alertCtrl.create();
      alert.setTitle('Enter password');
      alert.setSubTitle('');
  
      alert.addInput({
        type: 'password',
        label: 'Password',
      });

      alert.addButton('Cancel');
  
      alert.addButton({
        text: 'Import',
        handler: data => {
          if(data) {
            password = data[0];
            let privKey = this.nemProvider.decryptPrivateKey(password,JSON.parse(payload));
            this.formGroup.patchValue({ name: payload.name})
            this.formGroup.patchValue({ privateKey: privKey})
          }
        }
      });
  
      alert.present();
     }).catch(err => {
         console.log('Error', err);
     });
  }

}


