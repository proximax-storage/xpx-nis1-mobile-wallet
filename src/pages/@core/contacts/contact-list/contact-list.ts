import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController,
  Platform
} from 'ionic-angular';

import { ContactsProvider } from '../../../../providers/contacts/contacts';
import { BarcodeScannerProvider } from './../../../../providers/barcode-scanner/barcode-scanner';
import { App } from './../../../../providers/app/app';

/**
 * Generated class for the ContactListPage page.
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
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
  App = App;

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
    private alertCtrl: AlertController,
    private contactsProvider: ContactsProvider,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private barcodeScannerProvider: BarcodeScannerProvider
  ) {}

  ionViewWillEnter() {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  init() {
    this.contactsProvider.getAll().then(contacts => {
      this.contacts = contacts;
      this.selectedContact = this.contacts[0];
    });
  }

  onSelect(contact) {
    this.selectedContact = contact;
    this.navCtrl.push('ContactDetailPage', contact);
  }

  onPress(contact) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Modify ${contact.name}`,
      cssClass: 'wallet-on-press',
      buttons: [
        {
          text: 'Change details',
          icon: this.platform.is('ios') ? null : 'create',
          handler: () => {
            this.navCtrl.push('ContactUpdatePage', { contact: contact });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'trash',
          handler: () => {
            this.navCtrl.push('ContactDeletePage', { contact: contact });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: this.platform.is('ios') ? null : 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

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
      }
    });
    alert.present();
  }

  update(contact) {
    this.navCtrl.push('ContactUpdatePage', contact);
  }

  delete(contact) {
    this.alertCtrl
      .create({
        title: 'Remove contact',
        subTitle: `Are you sure to remove ${contact.name}?`,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Yes',
            handler: () => {}
          }
        ]
      })
      .present();
  }
}
