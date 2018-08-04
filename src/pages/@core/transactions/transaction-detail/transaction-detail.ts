import { NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

import { TransactionTypes } from 'nem-library';

/**
 * Generated class for the TransactionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html'
})
export class TransactionDetailPage {
  TransactionTypes = TransactionTypes;
  tx: any;

  constructor(private navParams: NavParams) {
    this.tx = this.navParams.data;
  }
}
