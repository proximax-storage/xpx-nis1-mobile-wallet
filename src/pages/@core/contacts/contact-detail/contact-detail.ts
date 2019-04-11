import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { App } from '../../../../providers/app/app';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilitiesProvider, private viewCtrl: ViewController) {
    console.log(this.navParams.data);
    this.selectedContact = this.navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }


  gotoTelegram(username) {
    if (username) {
      window.open(`https://t.me/${username}`, '_system');
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
