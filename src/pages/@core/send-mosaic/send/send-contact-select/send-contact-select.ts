import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from '../../../../../providers/app/app';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendContactSelectPage');
  }

  init() {
    this.title = this.navParams.get('title');
    this.contacts = [
      {
        id: 1,
        name: 'Jill Haman',
        address: 'NDUGQBHEAINJCAL7IR2XI55KR57AG6YRGEVUDQ63',
        telegram: 'jillhaman'
      },
      {
        id: 2,
        name: 'Joe Hopkins',
        address: 'NDUGQBHEAINJCAL7IR2XI55KR57AG6YRGEVULK32',
        telegram: 'joehopkins'
      }
    ];
    this.selectedContact = this.contacts[0];
  }

  onSelect(data) {
    this.selectedContact = data;
  }
}
