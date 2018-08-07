import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UtilitiesProvider } from '../providers/utilities/utilities';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  constructor(
    statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private storage: Storage,
    private utils: UtilitiesProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.initGetRoot().then(rootPage => {
        this.rootPage = rootPage;

        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);
      });
      this.initOnPauseResume();
      this.showPin();
    });
  }

  /**
   * Sets the root page base on the following conditions:
   *  1. App is first time opened -  OnboardingPage.
   *  2. App has an account logged in -  OnboardingPage.
   *  3. Anything else -  WelcomePage.
   */
  initGetRoot() {
    return Promise.all([
      this.storage.get('isFirstAppOpen'),
      this.storage.get('isLoggedIn')
    ]).then(results => {
      const isFirstAppOpen = results[0] === null ? true : !!results[0];
      const isLoggedIn = results[1];

      if (isFirstAppOpen) {
        return 'OnboardingPage';
      } else if (isLoggedIn) {
        return 'WalletListPage';
      } else {
        return 'WelcomePage';
      }
    });
  }

  initOnPauseResume() {
    this.platform.pause.subscribe(() => {
      Promise.all([
        this.storage.get('pin'),
        this.storage.get('isAppPaused')
      ]).then(results => {
        const pin = results[0];
        const isLocked = results[1] ? false : true;
        if (pin) this.storage.set('isLocked', isLocked);
      });
    });

    this.platform.resume.subscribe(() => {
      this.showPin();
    });
  }

  private showPin() {
    Promise.all([
      this.storage.get('pin'),
      this.storage.get('isLoggedIn'),
      this.storage.get('isAppPaused')
    ]).then(results => {
      const pin = results[0];
      const isLoggedIn = results[1];
      const isAppPaused = results[2];

      if (isAppPaused) {
        return this.storage.set('isAppPaused', false);
      } else if (
        this.rootPage !== 'OnboardingPage' &&
        this.rootPage !== 'WelcomePage' &&
        isLoggedIn &&
        pin
      ) {
        return this.utils.showModal('VerificationCodePage', {
          status: 'verify',
          title: 'Verify your PIN CODE',
          subtitle:
            'Similar to a password, your PIN CODE should be kept secret because it allows access to important services like the ability to withdraw, change personal information, and more.',
          invalidPinMessage: 'Incorrect pin. Please try again',
          pin: pin
        });
      }
    });
  }
}
