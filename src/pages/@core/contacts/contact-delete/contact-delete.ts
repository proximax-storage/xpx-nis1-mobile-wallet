import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { ContactsProvider } from '../../../../providers/contacts/contacts';
import { AuthProvider } from '../../../../providers/auth/auth';

/**
 * Generated class for the ContactDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-delete',
  templateUrl: 'contact-delete.html',
})
export class ContactDeletePage {
  App = App;
  formGroup: FormGroup;
  contact: any;

  PASSWORD: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private contactProvider: ContactsProvider,
    private authProvider: AuthProvider
  ) {
    this.contact = this.navParams.get('contact');
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDeletePage');
  }

  init() {
    this.formGroup = this.formBuilder.group({});
    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  goBack() {
    return this.navCtrl.setRoot(
      'ContactListPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit() {
    this.contactProvider
      .remove(this.contact)
      .then(_ => {
        return this.goBack();
      });
  }
}

