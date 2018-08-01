import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../../../providers/alert/alert';
import { AuthProvider } from '../../../../providers/auth/auth';

/**
 * Generated class for the PrivateKeyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private-key-password',
  templateUrl: 'private-key-password.html'
})
export class PrivateKeyPasswordPage {
  formGroup: FormGroup;

  credentials: { password: string; privateKey: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public alertProvider: AlertProvider,
  ) {
    this.init();
  }

  init() {
    // Initialize private data
    this.authProvider.getPassword().then(password => {
      this.credentials = {
        password: password,
        privateKey: ''
      };
    })

    // Initialize form
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
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
    if (form.password === this.credentials.password) {
      this.navCtrl.push('PrivateKeyPage', form.password);
    } else {
      this.alertProvider.showMessage('Incorrect password. Please try again.');
    }
  }
}
