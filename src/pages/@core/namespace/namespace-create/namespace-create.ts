import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from '../../../../providers/app/app';
import { ListStorageProvider } from '../../../../providers/list-storage/list-storage';
import { AuthProvider } from '../../../../providers/auth/auth';

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

  list: Array<any>;
  PASSWORD : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private listStorageProvider: ListStorageProvider,
    private authProvider: AuthProvider,
  ) {
    this.init();
  }

  ionViewWillEnter() {
    this.listStorageProvider.init('namespaces');
    this.listStorageProvider.getAll().then(value => {
      this.list = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletAddPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      parentNamespace: ['new', [Validators.minLength(3), Validators.required]],
      name: ['', [Validators.minLength(3), Validators.required]],
      sinkAddress: ['TAMESP-ACEWH4-MKFMBC-VFERDP-OOP4FK-7MTDJE-YP35', [Validators.required]],
      fee: ['0.15', [Validators.required]],
      rentalFee: ['100.00', [Validators.required]],
    });

    this.authProvider.getPassword().then(password => {
      this.PASSWORD = password;
    });
  }

  onSubmit(form) {
    form.name = form.parentNamespace ? `${form.parentNamespace}:${form.name}` : form.name;
    this.listStorageProvider.push(form).then(_ => {
      return this.navCtrl.pop();
    });
  }
}
