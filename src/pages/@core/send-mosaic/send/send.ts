import { GetBalanceProvider } from './../../../../providers/get-balance/get-balance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  SimpleWallet,
  MosaicTransferable,
  XEM,
  Address,
  TransferTransaction
} from 'nem-library';

import { App } from '../../../../providers/app/app';
import { NemProvider } from './../../../../providers/nem/nem';
import { WalletProvider } from './../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { AlertProvider } from '../../../../providers/alert/alert';

import { CurrencyMaskConfig } from 'ngx-currency/src/currency-mask.config';

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html'
})
export class SendPage {
  App = App;

  addressSourceType: { from: string; to: string };
  currentWallet: SimpleWallet;
  selectedMosaic: MosaicTransferable;

  form: FormGroup;
  inputOptions: CurrencyMaskConfig;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public nemProvider: NemProvider,
    public getBalanceProvider: GetBalanceProvider,
    public walletProvider: WalletProvider,
    public utils: UtilitiesProvider,
    public alertProvider: AlertProvider,
  ) {
    this.init();
  }

  ionViewWillEnter() {
    this.utils.setHardwareBack(this.navCtrl);

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

        this.getBalanceProvider
          .mosaics(this.currentWallet.address)
          .subscribe(mosaics => {
            this.selectedMosaic = mosaics[0];
          });

        // Set sender address to currenWallet.address
        this.form.get('senderName').setValue(this.currentWallet.name);
        this.form
          .get('senderAddress')
          .setValue(this.currentWallet.address.plain());
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
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
      suffix: ' XPX',
      thousands: ',',
      nullable: false
    };
    // Initialize form
    this.form = this.formBuilder.group({
      senderName: '',
      senderAddress: ['', Validators.required],

      recipientName: '',
      recipientAddress: ['', Validators.required],

      isMosaicTransfer: [false, Validators.required],
      message: ['', Validators.required],
      amount: ['', Validators.required],
      fee: ['', Validators.required]
    });

    // Initialize source type of NEM address in from and to
    this.addressSourceType = {
      from: 'contact',
      to: 'contact'
    };

    if (this.addressSourceType.to === 'manual') {
      this.form.get('recipientAddress').setValue('');
    }
  }

  onChangeFrom(val) {
    if (val === 'manual') {
      this.form.get('senderName').setValue(null);
      this.form.get('senderAddress').setValue(null);
    } else {
      this.form.get('senderName').setValue('Current wallet');
      this.form
        .get('senderAddress')
        .setValue(this.currentWallet.address.plain());
    }
  }

  onChangeTo(val) {
    if (val === 'manual') {
      this.form.get('recipientName').setValue(null);
      this.form.get('recipientAddress').setValue(null);
    }
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

          if (!XEM.MOSAICID.equals(this.selectedMosaic.mosaicId)) {
            this.form.get('isMosaicTransfer').setValue(true);
          }
        }
      });
  }

  selectContact(title) {
    this.utils
      .showInsetModal('SendContactSelectPage', { title: title })
      .subscribe(data => {
        if(data != undefined || data != null) {
          this.form.get('recipientName').setValue(data.name);
          this.form.get('recipientAddress').setValue(data.address);
        }
      });
  }

  /**
   * Calculates fee and returns prepared Transaction
   */
  private _prepareTx(recipient: Address): TransferTransaction {
    let transferTransaction: TransferTransaction;
    if (this.form.get('isMosaicTransfer').value) {
      const MOSAIC_TRANSFERRABLE = [
        new MosaicTransferable(
          this.selectedMosaic.mosaicId,
          this.selectedMosaic.properties,
          this.form.get('amount').value,
          this.selectedMosaic.levy
        )
      ];

      transferTransaction = this.nemProvider.prepareMosaicTransaction(
        recipient,
        MOSAIC_TRANSFERRABLE,
        this.form.get('message').value
      );
    } else {
      transferTransaction = this.nemProvider.prepareTransaction(
        recipient,
        this.form.get('amount').value,
        this.form.get('message').value
      );

      this.form.get('fee').setValue(transferTransaction.fee);
    }

    console.log('transferTransaction', transferTransaction);

    return transferTransaction;
  }

  /**
   * Sets transaction amount and determine if it is mosaic or xem transaction, updating fees
   */
  onSubmit() {
    if (!this.form.get('amount').value) this.form.get('amount').setValue(0);

    if (
      !this.form.get('senderAddress').value ||
      !this.form.get('recipientAddress').value
    ) {
      if (this.addressSourceType.to === 'contact') {
        this.alertProvider.showMessage('Please select a recipient first.');
      } else {
        this.alertProvider.showMessage(
          "Please type the recipient's address NEM address first."
        );
      }
      return;
    }

    try {
      let recipient = new Address(
        this.form
          .get('recipientAddress')
          .value.toUpperCase()
          .replace('-', '')
      );
      if (!this.nemProvider.isValidAddress(recipient)) {
        this.alertProvider.showMessage(
          'This address does not belong to this network'
        );
      } else {
        let transferTransaction = this._prepareTx(recipient);

        this.navCtrl.push('SendMosaicConfirmationPage', {
          ...this.form.value,
          mosaic: this.selectedMosaic,
          sendTx: transferTransaction,
          currentWallet: this.currentWallet
        });
      }
    } catch (err) {
      this.alertProvider.showMessage(
        'This address does not belong to this network'
      );
    }
  }
}
