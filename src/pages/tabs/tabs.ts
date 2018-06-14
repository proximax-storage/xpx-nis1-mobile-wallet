import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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

  constructor() {

  }
}
