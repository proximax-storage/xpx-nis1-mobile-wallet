import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { App } from '../../../../../providers/app/app';
import { ContactsProvider } from '../../../../../providers/contacts/contacts';

/**
 * Generated class for the SendContactSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public contactsProvider: ContactsProvider
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
    this.viewCtrl.dismiss(this.selectedContact);
  }
}
