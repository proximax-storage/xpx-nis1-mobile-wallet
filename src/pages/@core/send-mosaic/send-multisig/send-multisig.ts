import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SimpleWallet, MosaicTransferable, XEM, Address, TransferTransaction, AccountInfo, AccountInfoWithMetaData, Transaction } from 'nem-library';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NemProvider } from '../../../../providers/nem/nem';
import { GetBalanceProvider } from '../../../../providers/get-balance/get-balance';
import { WalletProvider } from '../../../../providers/wallet/wallet';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';
import { AlertProvider } from '../../../../providers/alert/alert';
import { CoingeckoProvider } from '../../../../providers/coingecko/coingecko';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { App } from '../../../../providers/app/app';
/**
 * Generated class for the SendMultisigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-multisig',
  templateUrl: 'send-multisig.html',
})
export class SendMultisigPage {
  App = App;

  addressSourceType: { from: string; to: string };
  currentWallet: SimpleWallet;
  selectedMosaic: MosaicTransferable;
  selectedCoin: any;

  form: FormGroup;
  fee: number = 0;
  amount: number = 0;
  mosaicSelectedName: string;

  // Multisig
  multisigAccounts: AccountInfo[];
  selectedAccount: AccountInfo;
  selectedAccountAddress: string;
  accountInfo: AccountInfoWithMetaData;
  isMultisig: boolean;
  multisigAccountAddress: Address;

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
    console.log("Nav params", this.navParams.data);

    this.mosaicSelectedName = this.navParams.get('mosaicSelectedName');
    console.log(this.mosaicSelectedName);

    // If no mosaic selected, fallback to xpx
    if (!this.mosaicSelectedName) {
      this.mosaicSelectedName = 'xpx';
    }

    this.init();
  }

  onAccountSelected() {
    if (this.multisigAccounts) {
      this.selectedAccount = this.multisigAccounts.find(multisigAccount => multisigAccount.publicAccount.address.plain() === this.selectedAccountAddress);
      console.log("Selected account", this.selectedAccount);

      this.getMosaics();
    }
  }

  getAccountInfo() {
    console.info("Getting account information.", this.currentWallet.address)
    this.nemProvider
      .getAccountInfo(this.currentWallet.address)
      .subscribe(accountInfo => {
        if (accountInfo) {
          this.accountInfo = accountInfo;

          if (this.accountInfo.cosignatoryOf) {
            console.clear();
            console.log("This is a multisig account");
            this.isMultisig = true;

            
            this.multisigAccounts = [... this.accountInfo.cosignatoryOf]; // get multisig accounts the user has

            if(!this.selectedAccount) {
              this.selectedAccount = this.multisigAccounts[0]; // select first account as default
              this.selectedAccountAddress = this.multisigAccounts[0].publicAccount.address.plain();
              this.multisigAccountAddress = this.multisigAccounts[0].publicAccount.address;
            }

            console.log("accountInfo", this.accountInfo)
            console.log("Multisig accounts", this.multisigAccounts)

            // Get Mosaic list + balance
            this.getMosaics();


          }

        }
      });
  }

  ionViewWillEnter() {
    // this.utils.setHardwareBack(this.navCtrl);
    console.log('ionViewWillEnter SendMultisigPage');
    this.walletProvider.getSelectedWallet().then(currentWallet => {
      if (currentWallet) {
        this.currentWallet = currentWallet;
        this.getAccountInfo(); // Get multisig account info
      }
    });



  }
  getMosaics() {

    if (this.selectedAccount.publicAccount.address) {
      this.getBalanceProvider
        .mosaics(this.selectedAccount.publicAccount.address)
        .subscribe(mosaics => {

          console.log("Multisig mosaic", mosaics);
          if (!this.selectedMosaic) {
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
          if (coinId) {
            this.coingeckoProvider.getDetails(coinId).subscribe(coin => {
              this.selectedCoin = coin;
            });
          }
        });

      // Set sender address to currenWallet.address
      this.form.get('senderName').setValue(this.currentWallet.name);
      this.form.get('senderAddress').setValue(this.multisigAccountAddress.plain());
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMultisigPage');
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
      fee: ['', Validators.required],

      selectedAccountAddress: '',
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
        walletAddress: this.selectedAccount.publicAccount.address,
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
          "Please type the recipient's address first."
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
          total: total,
          transactionType: 'multisig',
          publicKey: this.selectedAccount.publicAccount.publicKey
        }, {
            enableBackdropDismiss: false,
            showBackdrop: true
          });
        modal.present();
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
      this.form.patchValue({ recipientName: payload.data.name })
      this.form.patchValue({ recipientAddress: payload.data.addr })
    }).catch(err => {
      console.log('Error', err);
      this.alertProvider.showMessage(err);

    });


  }
}
