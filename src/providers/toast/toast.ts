import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {
  constructor(public toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  show(
    message: string,
    duration: number,
    showCloseButton: boolean = false,
    closeButtonText: string = 'Close'
  ) {
    const DURATION = duration * 1000;

    return this.toastCtrl.create({
      message: message,
      duration: DURATION,
      showCloseButton: showCloseButton,
      closeButtonText: showCloseButton ? closeButtonText : 'Ok'
    }).present();
  }
}
