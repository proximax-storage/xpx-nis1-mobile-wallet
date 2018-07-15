import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from '../../../../providers/app/app';

/**
 * Generated class for the ContactDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  App = App;

  selectedContact: {
    id: number;
    name: string;
    address: string;
    telegram: string;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedContact = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

  gotoTransactionDetail() {
    this.navCtrl.push('TransactionDetailPage');
  }

  gotoTelegram(username) {
    if (username) {
      window.open(`https://t.me/${username}`, '_system');
    }
  }
}
