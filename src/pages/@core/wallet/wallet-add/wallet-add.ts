import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';

/**
 * Generated class for the WalletAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-add',
  templateUrl: 'wallet-add.html'
})
export class WalletAddPage {
  App = App;

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]]
    });
  }

  gotoHome() {
    this.navCtrl.setRoot(
      'WalletListPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    console.log(form);
    this.gotoHome();
  }
}
