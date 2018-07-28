import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../../providers/auth/auth';
import { WalletProvider } from '../../../providers/wallet/wallet';

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
    public walletProvider: WalletProvider,
    public authProvider: AuthProvider
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
      this.navCtrl.setRoot(
        'VerificationCodePage',
        {
          status: 'verify',
          title: 'Verify pin',
          invalidPinMessage:
            'It looks like you entered a wrong pin code. Please try again',
          pin: pin
        },
        {
          animate: true,
          direction: 'forward'
        }
      );
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
          alert(res.message);
        }
      })
      .catch(err => {
        alert(
          'It looks like this account does not exist. Please register first and login again.'
        );
      });
  }
}
