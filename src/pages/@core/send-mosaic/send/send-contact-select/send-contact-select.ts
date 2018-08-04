import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { App } from '../../../../../providers/app/app';
import { ContactsProvider } from '../../../../../providers/contacts/contacts';
import { BarcodeScannerProvider } from '../../../../../providers/barcode-scanner/barcode-scanner';

/**
 * Generated class for the SendContactSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export enum ContactCreationType {
  MANUAL = 0,
  QR_SCAN = 1
}
@IonicPage()
@Component({
  selector: 'page-send-contact-select',
  templateUrl: 'send-contact-select.html'
})
export class SendContactSelectPage {
  App = App;
  title: string;

  selectedContact: any;
  contacts: Array<{
    id: number;
    name: string;
    address: string;
    telegram: string;
  }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public contactsProvider: ContactsProvider,
    private alertCtrl: AlertController,
    private barcodeScannerProvider: BarcodeScannerProvider
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendContactSelectPage');
  }

  init() {
    this.title = this.navParams.get('title');
    this.contactsProvider.getAll().then(contacts => {
      this.contacts = contacts;
      this.selectedContact = this.contacts[0];
    });
  }

  onSelect(data) {
    this.selectedContact = data;
  }

  onSubmit() {
    if (this.selectedContact) {
      this.viewCtrl.dismiss(this.selectedContact);
    } else {
      this.viewCtrl.dismiss();
    }

  }

  // showAddContactPrompt() {
  //   this.viewCtrl.dismiss().then(()=> {
  //     this.navCtrl.push("ContactAddPage");
  //   })

  // }

  showAddContactPrompt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Add new contact');
    alert.setSubTitle('Select adding type below');

    alert.addInput({
      type: 'radio',
      label: 'Manual input',
      value: ContactCreationType.MANUAL.toString(),
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'QR scan',
      value: ContactCreationType.QR_SCAN.toString(),
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Proceed',
      handler: data => {

        this.viewCtrl.dismiss(undefined).then(() => {

          if (data === ContactCreationType.MANUAL.toString()) {
            this.navCtrl.push('ContactAddPage', {
              name: '',
              address: '',
              telegram: ''
            });
          } else if (data === ContactCreationType.QR_SCAN.toString()) {
            this.barcodeScannerProvider
              .getData('ContactListPage')
              .then(result => {
                const ACCOUNT_INFO = {
                  name: result.data.name || '',
                  address: result.data.addr || '',
                  telegram: result.data.telegram || ''
                };

                if (data) this.navCtrl.push('ContactAddPage', ACCOUNT_INFO);
              });
          }
        })

      }
    });
    alert.present();
  }
}
