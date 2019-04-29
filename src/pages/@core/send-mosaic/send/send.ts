import { GetBalanceProvider } from './../../../../providers/get-balance/get-balance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
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

import { CoingeckoProvider } from '../../../../providers/coingecko/coingecko';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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
  selectedCoin: any;

  form: FormGroup;
  fee: number = 0;
  amount: number;
  mosaicSelectedName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public nemProvider: NemProvider,
    public getBalanceProvider: GetBalanceProvider,
    public walletProvider: WalletProvider,
    public utils: UtilitiesProvider,
    public alertProvider: AlertProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private coingeckoProvider: CoingeckoProvider,
    private barcodeScanner: BarcodeScanner
  ) {
    console.log("Nav params",this.navParams.data);
    
    this.mosaicSelectedName = this.navParams.get('mosaicSelectedName');
    console.log(this.mosaicSelectedName);

    // If no mosaic selected, fallback to xpx
    if(!this.mosaicSelectedName) {
      this.mosaicSelectedName = 'xpx';
    }


    this.init();
  }

  ionViewWillEnter() {
    // this.utils.setHardwareBack(this.navCtrl);
    console.log('ionViewWillEnter SendPage');
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (!currentWallet) {
        this.navCtrl.setRoot(
          'TabsPage',
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
            if(!this.selectedMosaic) {
                this.selectedMosaic = mosaics.filter(m => m.mosaicId.name == this.mosaicSelectedName)[0];
                console.log("this.selectedMosaic", this.selectedMosaic);

              if (!XEM.MOSAICID.equals(this.selectedMosaic.mosaicId)) {
                console.log('this.selectedMosaic.mosaicId', this.selectedMosaic.mosaicId);
                this.form.get('isMosaicTransfer').setValue(true);
              }
            }

            let mosaic = this.selectedMosaic.mosaicId.name;
            let coinId: string;

            if (mosaic === 'xem') {
              coinId = 'nem';
            }
            else if (mosaic === 'xpx') {
              coinId = 'proximax';
            } else if (mosaic === 'npxs') {
              coinId = 'pundi-x';
            } 

            // Get coin price
            if(coinId) {
              this.coingeckoProvider.getDetails(coinId).subscribe(coin => {
                this.selectedCoin = coin;
              });
            }
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

    console.log('Init called');

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

    // Defaults to manual contact input
    this.addressSourceType.to = 'manual';

    if (this.addressSourceType.to === 'manual') {
      this.form.get('recipientAddress').setValue('');
    }

    this.fee = 0;
    this.amount = null;
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

    if (val === 'qrcode') {
      this.scan();
    }
  }

  selectMosaic() {
    this.utils
      .showInsetModal('SendMosaicSelectPage', {
        selectedMosaic: this.selectedMosaic
      })
      .subscribe(data => {
        if (data) {
          console.log('Selected mosaic', data);
          this.selectedMosaic = data;
          console.log(this.selectedMosaic);

          if (!XEM.MOSAICID.equals(this.selectedMosaic.mosaicId)) {
            console.log('this.selectedMosaic.mosaicId', this.selectedMosaic.mosaicId);
            this.form.get('isMosaicTransfer').setValue(true);
          }
        }
      });
  }

  selectContact(title) {
    this.utils
      .showInsetModal('SendContactSelectPage', { title: title })
      .subscribe(data => {
        if (data != undefined || data != null) {
          this.form.get('recipientName').setValue(data.name);
          this.form.get('recipientAddress').setValue(data.address);
        }
      });
  }

  calculateFee() {
    try {
      let recipient = new Address(
        this.form
          .get('recipientAddress')
          .value.toUpperCase()
          .replace('-', '')
      );
      console.log(recipient);
      if (!this.nemProvider.isValidAddress(recipient)) {
        this.alertProvider.showMessage(
          'This address does not belong to this network'
        );
      } else {
        this._prepareTx(recipient);
      }
    } catch (err) {
      this.alertProvider.showMessage(
        'This address does not belong to this network'
      );
    }
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
      this.fee = transferTransaction.fee * 0.000001;

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
          "Please enter the recipient's address first."
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
        // Prepare transaction
        let transferTransaction = this._prepareTx(recipient);

        // Compute total
        console.log(this.selectedCoin.market_data.current_price.usd, this.form.get('amount').value);
        let total = this.selectedCoin.market_data.current_price.usd * Number(this.form.get('amount').value);

        // Show confirm transaction
        let page = "SendMosaicConfirmationPage";
        const modal = this.modalCtrl.create(page, {
          ...this.form.value,
          mosaic: this.selectedMosaic,
          sendTx: transferTransaction,
          currentWallet: this.currentWallet,
          transactionType: 'normal',
          total: total
        }, {
            enableBackdropDismiss: false,
            showBackdrop: true
          });
        modal.present();

        // this.navCtrl.push('SendMosaicConfirmationPage', {
        //   ...this.form.value,
        //   mosaic: this.selectedMosaic,
        //   sendTx: transferTransaction,
        //   currentWallet: this.currentWallet
        // });
      }
    } catch (err) {
      this.alertProvider.showMessage(
        'This address does not belong to this network'
      );
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      barcodeData.format = "QR_CODE";
      let payload = JSON.parse(barcodeData.text);
      this.form.patchValue({ recipientName: payload.data.name})
      this.form.patchValue({ recipientAddress: payload.data.addr })
     }).catch(err => {
         console.log('Error', err);
         this.alertProvider.showMessage(err);
     });
  }
}
