import { ToastProvider } from './../../../providers/toast/toast';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { HapticProvider } from '../../../providers/haptic/haptic';
import { AlertProvider } from '../../../providers/alert/alert';

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
  passwordType: string = "password";
  passwordIcon: string = "ios-eye-outline";

  confirmPasswordType: string = "password";
  confirmPasswordIcon: string = "ios-eye-outline";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public utils: UtilitiesProvider,
    private haptic: HapticProvider,
    private alertProvider: AlertProvider
  ) {
    this.init();
    this.passwordType = "password";
    this.passwordIcon = "ios-eye-outline";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  init() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.formGroup.valueChanges.subscribe(form => {
      this.checkPasswords(this.formGroup);
    });
  }

    checkPasswords(form: FormGroup) {
      let pass = form.controls.password.value;
      let confirmPass = form.controls.confirmPassword.value;

    return pass === confirmPass
      ? null
      : this.formGroup.setErrors([{ passwordMismatch: true }]);
  }


  onSubmit(form) {
    if(form.password === form.confirmPassword) {
      this.authProvider
        .register(form.email, form.password)
        .then(status => {
          if(status === "duplicate") {
            this.alertProvider.showMessage("Account already exist. Please try again.");
            this.haptic.notification({ type: 'error' });
          } else {
            this.haptic.notification({ type: 'success' });
            this.navCtrl.setRoot(
              'TabsPage',
              {},
              {
                animate: true,
                direction: 'forward'
              }
            );
            this.utils.showModal('VerificationCodePage', { status: 'setup', destination: 'TabsPage' });
          }
        })
        .then(_ => {
          this.authProvider.setSelectedAccount(form.email, form.password);
        })
    } else {
      alert("Please make sure you confirm your password.");
    }
   
  }

  showHidePassword(e: Event){
    e.preventDefault();
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    this.passwordIcon = this.passwordIcon === "ios-eye-outline" ? "ios-eye-off-outline" : "ios-eye-outline";
  }

  showHideConfirmPassword(e: Event) {
    e.preventDefault();
    this.confirmPasswordType = this.confirmPasswordType === "password" ? "text" : "password";
    this.confirmPasswordIcon = this.confirmPasswordIcon === "ios-eye-outline" ? "ios-eye-off-outline" : "ios-eye-outline";
  }

  
}
