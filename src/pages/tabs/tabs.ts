import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events, Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabIndex: number;
  tab1Root = HomePage;
  tab2Root = 'ContactListPage';
  tab3Root = 'TransactionListPage';
  tab4Root = 'SettingListPage';

  selectedIndex: number;

  @ViewChild(Tabs) public tabs: Tabs;

  constructor(private navCtrl: NavController, public events: Events, private utils: UtilitiesProvider) { }

  ionViewWillEnter() {
    this.utils.setHardwareBack();

    this.events.subscribe('tab:back', (index) => {
      this.tabs.select(index);
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe('tab:back');
  }

  gotoSend() {
    this.navCtrl.push('SendPage');
  }
}
