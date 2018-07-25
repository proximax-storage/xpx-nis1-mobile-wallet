import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScannerProvider } from '../../../../providers/barcode-scanner/barcode-scanner';
import { FilePickerProvider } from '../../../../providers/file-picker/file-picker';

/**
 * Generated class for the WalletImportOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletImportOption {
  PRIVATE_KEY = 0,
  WALLET_FILE = 1,
  NANO_WALLET = 2,
  NEM_MOBILE_WALLET = 3,
  SHELTER_DAO = 4,
  RACCOON_WALLET = 5,
  NEM_PAY = 6,
  PROXIMAX_WALLET = 7
}

@IonicPage()
@Component({
  selector: 'page-wallet-import-option',
  templateUrl: 'wallet-import-option.html'
})
export class WalletImportOptionPage {
  options: Array<{
    name: string;
    value: number;
    prompt?: string;
  }>;
  selectedOption: {
    name: string;
    value: number;
    prompt?: string;
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filePickerProvider: FilePickerProvider,
    private barcodeScannerProvider: BarcodeScannerProvider,
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletImportOptionPage');
  }

  init() {
    this.options = [
      {
        name: 'Private key',
        value: WalletImportOption.PRIVATE_KEY
      },
      {
        name: 'Wallet file',
        value: WalletImportOption.WALLET_FILE
      },
      {
        name: 'Nano wallet',
        value: WalletImportOption.NANO_WALLET,
        prompt: 'Scan QR from Nano wallet'
      },
      {
        name: 'NEM mobile wallet (iOS & android)',
        value: WalletImportOption.NEM_MOBILE_WALLET,
        prompt: 'Scan QR from NEM mobile wallet'
      },
      {
        name: 'Shelter DAO',
        value: WalletImportOption.SHELTER_DAO,
        prompt: 'Scan QR from NEM Shelter DAO'
      },
      {
        name: 'Raccoon wallet',
        value: WalletImportOption.RACCOON_WALLET,
        prompt: 'Scan QR from Raccoon wallet'
      },
      {
        name: 'NEMPay',
        value: WalletImportOption.NEM_PAY,
        prompt: 'Scan QR from NEMPay'
      },
      {
        name: 'ProximaX wallet',
        value: WalletImportOption.PROXIMAX_WALLET,
        prompt: 'Scan QR from ProximaX wallet'
      }
    ];
    this.selectedOption = this.options[0];
  }

  onSelect(option) {
    this.selectedOption = option;

    this.onSubmit();
  }

  onSubmit() {
    if (this.selectedOption.value === WalletImportOption.PRIVATE_KEY) {
      this.navCtrl.push('WalletAddPrivateKeyPage', {
        name: '',
        privateKey: ''
      });
    } else if (this.selectedOption.value === WalletImportOption.WALLET_FILE) {
      this.filePickerProvider.open().then(data => {
        this.navCtrl.push('WalletAddPasswordConfirmationPage', data);
      });
    } else {
      this.barcodeScannerProvider
        .getData('WalletImportOption', this.selectedOption.prompt)
        .then(data => {
          // Check value based on length of properties in data.
          const hasValue = Object.keys(data).length;

          console.log('barcodeScannerProvider :: data', data);

          if (hasValue) {
            this.navCtrl.push('WalletAddPasswordConfirmationPage', data);
          }
        });
    }
  }
}
