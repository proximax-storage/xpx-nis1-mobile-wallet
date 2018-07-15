import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { ListStorageProvider } from '../../../../providers/list-storage/list-storage';

/**
 * Generated class for the NamespaceCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-namespace-create',
  templateUrl: 'namespace-create.html'
})
export class NamespaceCreatePage {
  App = App;
  formGroup: FormGroup;

  PASSWORD = '123qweasd';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private listStorage: ListStorageProvider
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      parentNamespace: ['new', [Validators.minLength(3), Validators.required]],
      name: ['', [Validators.minLength(3), Validators.required]]
    });
  }

  goBack() {
    return this.navCtrl.setRoot(
      'WalletListPage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }

  onSubmit(form) {
    this.listStorage.push(form).then(_ => {
      return this.goBack();
    });
  }
}
