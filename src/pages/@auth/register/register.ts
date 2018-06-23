import { AuthProvider } from './../../../providers/auth/auth';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private authProvider: AuthProvider
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.formGroup.valueChanges.subscribe(form => {
      this.checkPasswords(this.formGroup);
    });
  }

  /**
   * Add confirm password validator
   * @param group { FormGroup } The form must have the following value:
   * this.formGroup = this.formBuilder.group({
   *  password: [ '', Validators.required ],
   *  confirmPassword: [ '', Validators.required ]
   *  ...
   * });
   */
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass
      ? null
      : this.formGroup.setErrors([{ passwordMismatch: true }]);
  }

  onSubmit(form) {
    this.authProvider.register(form.email, form.password).then((res) => {
      this.navCtrl.push('OtpCodePage', form.email);
    }).catch(console.error);
  }
}
