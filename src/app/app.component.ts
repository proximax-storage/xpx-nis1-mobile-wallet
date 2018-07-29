import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  constructor(
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private platform: Platform,
    private storage: Storage,
    private app: App
  ) {
    platform.ready().then(() => {
      this.initGetRoot();
      this.initOnResumeListener();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Sets the root page base on the following conditions:
   *  1. App is first time opened -  OnboardingPage.
   *  2. App has an account logged in -  OnboardingPage.
   *  3. Anything else -  WelcomePage.
   */
  initGetRoot() {
    Promise.all([
      this.storage.get('isFirstAppOpen'),
      this.storage.get('isLoggedIn')
    ]).then(results => {
      const isFirstAppOpen = results[0] === null ? true : !!results[0];
      const isLoggedIn = results[1];

      if (isFirstAppOpen) {
        this.showPin('OnboardingPage');
      } else if (isLoggedIn) {
        this.showPin('WalletListPage');
      } else {
        this.showPin('WelcomePage');
      }
    });
  }

  /**
   * Listen to onPause of app - leaving this app and go to another or go to home screen.
   */
  initOnResumeListener() {
    this.platform.pause.subscribe(() => {
      this.showPin();
    });
  }

  /**
   * Checks the if resume is triggered by barcode scan or thru app navigation and
   * gets the pin of the app
   */
  showPin(page?: string) {
    return Promise.all([
      this.storage.get('isBarcodeScan'),
      this.storage.get('pin')
    ]).then(results => {
      const isLocked = results[0] ? false : true;
      const pin = results[1];

      if (pin && page !== 'OnboardingPage' && page !== 'WelcomePage') {
        return this.storage.set('isLocked', isLocked).then(_ => {
          return this.app
            .getRootNav()
            .setRoot('VerificationCodePage', { title: 'Verify pin', status: 'verify', pin: pin });
        });
      } else {
        this.rootPage = page ? page : 'WelcomePage';
      }
    });
  }
}
