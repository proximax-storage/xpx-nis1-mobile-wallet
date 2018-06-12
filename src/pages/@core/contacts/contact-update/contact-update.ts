import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';

/**
 * Generated class for the ContactUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-update',
  templateUrl: 'contact-update.html',
})
export class ContactUpdatePage {
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
    console.log('ionViewDidLoad ContactUpdatePage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      name: [this.navParams.data.name, [Validators.minLength(3), Validators.required]],
      address: [this.navParams.data.address, [Validators.minLength(40), Validators.required]],
    });
  }

  gotoHome() {
    this.navCtrl.pop();
  }

  onSubmit(form) {
    console.log(form);
    this.gotoHome();
  }
}
