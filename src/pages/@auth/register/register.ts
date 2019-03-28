import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public utils: UtilitiesProvider,
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit(form) {
    this.authProvider
      .register(form.email, form.password)
      .then(_ => {
        this.utils.showModal('VerificationCodePage', { status: 'confirm', destination: 'WalletListPage' });
      })
      .then(_ => {
        this.authProvider.setSelectedAccount(form.email, form.password);
      });
  }
}
