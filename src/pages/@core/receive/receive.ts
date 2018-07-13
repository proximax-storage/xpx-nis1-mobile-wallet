import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  SimpleWallet,
  MosaicTransferable
} from 'nem-library';
import { CurrencyMaskConfig } from 'ngx-currency/src/currency-mask.config';

import { WalletProvider } from '../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { GetBalanceProvider } from './../../../providers/get-balance/get-balance';

/**
 * Generated class for the ReceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html'
})
export class ReceivePage {
  currentWallet: SimpleWallet;
  form: FormGroup;
  selectedMosaic: MosaicTransferable;

  inputOptions: CurrencyMaskConfig;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private getBalanceProvider: GetBalanceProvider,
    private walletProvider: WalletProvider,
    public utils: UtilitiesProvider,
  ) {
    this.init();
  }

  init() {
    // Initialize input options
    this.inputOptions = {
      align: 'center',
      allowNegative: false,
      allowZero: true,
      decimal: '.',
      precision: 2,
      prefix: '',
      suffix: ' XEM',
      thousands: ',',
      nullable: false
    };

    this.form = this.formBuilder.group({
      amount: [0, Validators.required],
      message: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (!currentWallet) {
        this.navCtrl.setRoot(
          'WalletListPage',
          {},
          {
            animate: true,
            direction: 'backward'
          }
        );
      } else {
        this.currentWallet = currentWallet;

        this.getBalanceProvider.mosaics(this.currentWallet.address).subscribe(mosaics => {
          this.selectedMosaic = mosaics[0];
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivePage');
  }

  selectMosaic() {
    this.utils
      .showInsetModal('SendMosaicSelectPage', {
        selectedMosaic: this.selectedMosaic
      })
      .subscribe(data => {
        if (data) {
          this.selectedMosaic = data;
          this.inputOptions.suffix =
            ' ' + this.selectedMosaic.mosaicId.name.toUpperCase();
        }
      });
  }

  onSubmit() {
    const data = {
      ...this.form.value,
      mosaic: this.selectedMosaic
    };

    this.utils.showInsetModal('ReceiveQrCodePage', data);
  }
}
