import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WalletAddOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum WalletAddOption {
  SIMPLE = 0,
  SHARED = 1
}

@IonicPage()
@Component({
  selector: 'page-wallet-add-option',
  templateUrl: 'wallet-add-option.html'
})
export class WalletAddOptionPage {
  options: Array<{
    name: string;
    value: number;
  }>;
  selectedOption: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddOptionPage');
  }

  init() {
    this.options = [
      {
        name: 'Create personal wallet',
        value: WalletAddOption.SIMPLE
      },
      {
        name: 'Create shared wallet',
        value: WalletAddOption.SHARED
      }
    ];
  }

  onSelect(option) {
    this.selectedOption = option.value;

    this.onSubmit();
  }

  onSubmit() {
    if (this.selectedOption === WalletAddOption.SIMPLE) {
      this.navCtrl.push('WalletAddPage');
    } else if (this.selectedOption === WalletAddOption.SHARED) {
    }
  }
}
