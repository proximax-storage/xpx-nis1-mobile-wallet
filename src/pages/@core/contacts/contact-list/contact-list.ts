import { App } from './../../../../providers/app/app';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ContactListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  App = App;

  selectedContact: any;
  contacts: Array<{
    id: number,
    name: string,
    address: string,
  }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  init() {
    this.contacts = [
      {
        id: 1,
        name: 'Jill Haman',
        address: 'NDUGQBHEAINJCAL7IR2XI55KR57AG6YRGEVUDQ63'
      },
      {
        id: 2,
        name: 'Joe Hopkins',
        address: 'NDUGQBHEAINJCAL7IR2XI55KR57AG6YRGEVULK32'
      }
    ];
    this.selectedContact = this.contacts[0];
  }

  onContactSelect(contact) {
    this.selectedContact = contact;
  }

  gotoAddContact() {
    this.navCtrl.push('ContactAddPage');
  }

  update(contact) {
    this.navCtrl.push('ContactUpdatePage', contact);
  }

  delete(contact) {
    this.alertCtrl.create({
      title: 'Remove contact',
      subTitle: `Are you sure to remove ${contact.name}?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: () => {

          }
        }
      ]
    }).present();
  }

}
