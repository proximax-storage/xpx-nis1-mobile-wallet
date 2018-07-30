import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'ContactListPage';
  tab3Root = 'TransactionListPage';
  tab4Root = 'SettingListPage';

  tabIndex: number;

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewWillEnter() {
    this.tabIndex = <number> this.navParams.get('tabIndex') || 0;
  }

  gotoSend() {
    this.navCtrl.push('SendPage');
  }
}
