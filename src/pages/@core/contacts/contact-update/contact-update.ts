import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { ContactsProvider } from '../../../../providers/contacts/contacts';

/**
 * Generated class for the ContactUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-update',
  templateUrl: 'contact-update.html'
})
export class ContactUpdatePage {
  App = App;

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public contactsProvider: ContactsProvider
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUpdatePage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: [
        this.navParams.get('name'),
        [Validators.minLength(3), Validators.required]
      ],
      address: [
        this.navParams.get('address'),
        [Validators.minLength(40), Validators.required]
      ],
      telegram: [this.navParams.get('telegram')]
    });

    this.formGroup.setValue(this.navParams.get('contact'));
  }

  gotoHome() {
    this.contactsProvider
      .update(this.navParams.get('contact').id, this.formGroup.value)
      .then(_ => {
        this.navCtrl.pop();
      });
  }

  onSubmit(form) {
    this.gotoHome();
  }
}
