import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private app: App) {

  }

  gotoWalletList() {
   this.app.getRootNav().setRoot('WalletListPage', {}, {
      animate: true,
      direction: 'backward'
    });
  }
}
