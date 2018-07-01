import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.init();
  }

  init() {
    this.formGroup = this.formBuilder.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  gotoHome() {
    this.navCtrl.setRoot('OtpCodePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSubmit(form) {
    console.log(form);
    this.gotoHome();
  }
}
