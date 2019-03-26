import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../../providers/auth/auth';
import { WalletProvider } from '../../../providers/wallet/wallet';
import { AlertProvider } from '../../../providers/alert/alert';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public alertProvider: AlertProvider,
    public walletProvider: WalletProvider,
    public authProvider: AuthProvider,
    public utils: UtilitiesProvider,
  ) {
    this.init();
  }

  init() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  gotoHome() {
    this.storage.get('pin').then(pin => {
      this.utils.showModal('VerificationCodePage', {
        status: 'verify',
        title: 'Verify your PIN CODE',
        subtitle:
          'Similar to a password, your PIN CODE should be kept secret because it allows access to important services like the ability to withdraw, change personal information, and more.',
        invalidPinMessage: 'Incorrect pin. Please try again',
        pin: pin,
        destination: 'TabsPage'
      });
    });
  }

  onSubmit(form) {
    this.authProvider
      .login(form.email, form.password)
      .then(res => {
        if (res.status === 'success') {
          this.authProvider
            .setSelectedAccount(form.email, form.password)
            .then(_ => {
              setTimeout(() => {
                this.gotoHome();
              }, 1000);
            });
        } else {
          this.utils.showInsetModal('TryAgainPage', {}, 'small');
        }
      })
      .catch(err => {
        this.utils.showInsetModal('TryAgainPage', {}, 'small');
      });
  }
}
