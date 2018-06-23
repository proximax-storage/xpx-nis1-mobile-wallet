import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { App } from '../../../../providers/app/app';

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  App = App;

  selectedMosaic:{ namespace: string, mosaic: string, amount: number } = {
    namespace: 'nem',
    mosaic: 'xem',
    amount: 1000
  };

  sender: { name: string, address: string } = {
    name: 'Current Account',
    address: 'ND2MPZAC4BOYGJEFGXVKKY4EHZAEHAD32TPKYSBQ'
  };

  recipient: { name: string, address: string } = {
    name: 'Jill Haman',
    address: 'NDUGQBHEAINJCAL7IR2XI55KR57AG6YRGEVUDQ63'
  };

  inputOptions = {
    prefix: '',
    suffix: ' XEM',
    thousands: ',',
    decimal: '.',
    precision: 2
  };

  amount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  selectMosaic() {
    this.showModal('SendMosaicSelectPage');
  }

  selectContact(title) {
    this.showModal('SendContactSelectPage', { title: title });
  }

  showModal(page, data = {}) {
    this.modalCtrl.create(page, data, {
      cssClass: 'inset-modal',
      enableBackdropDismiss: true,
      showBackdrop: true
    }).present();
  }

}
