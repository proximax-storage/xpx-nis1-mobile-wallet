import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from '../../../../../providers/app/app';

/**
 * Generated class for the SendMosaicSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-mosaic-select',
  templateUrl: 'send-mosaic-select.html',
})
export class SendMosaicSelectPage {

  App = App;

  selectedMosaic: any;
  mosaics : Array<{
    id: number,
    logo: string,
    namespace: string,
    name: string,
    amount: number,
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMosaicSelectPage');
  }

  init() {
    this.mosaics = [
      {
        id: 1,
        logo: App.LOGO.NEM,
        namespace: 'NEM',
        name: 'XEM',
        amount: 12345
      },
      {
        id: 2,
        logo: App.LOGO.XPX,
        namespace: 'ProximaX',
        name: 'XPX',
        amount: 789
      },
      {
        id: 3,
        logo: App.LOGO.LYL,
        namespace: 'Appsolutely',
        name: 'LYL',
        amount: 987
      }
    ];

    this.selectedMosaic = this.mosaics[0];
  }

  onSelect(data) {
    this.selectedMosaic = data;
  }

}
