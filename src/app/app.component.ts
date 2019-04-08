import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { OneSignal } from '@ionic-native/onesignal';

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
    private utils: UtilitiesProvider,
    private oneSignal: OneSignal
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


      this.oneSignal.startInit('440ee37e-cfc8-4a61-8df8-87dfff255ce5', '1031485430046');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // do something when notification is received
        alert(data);
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();
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
      this.storage.get('isLoggedIn'),
    ]).then(results => {
      const isFirstAppOpen = results[0] === null ? true : !!results[0];
      const isLoggedIn = results[1];

      if (isFirstAppOpen) {
        return 'OnboardingPage';
      } else if (isLoggedIn) {
        return 'TabsPage';
      } else {
        return 'WelcomePage';
      }
    });
  }

  initOnPauseResume() {
    this.platform.pause.subscribe(() => {
      Promise.all([
        this.storage.get('pin'),
        this.storage.get('isAppPaused'),
      ]).then(results => {
        const pin = !!results[0];
        const isAppPaused = !!results[1];

        if (pin) this.storage.set('isAppPaused', isAppPaused);
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
      this.storage.get('isAppPaused'),
      this.storage.get('isModalShown'),
    ]).then(results => {
      const pin = results[0];
      const isLoggedIn = results[1];
      const isAppPaused = results[2];
      const isModalShown = results[3];

      console.log('rootPage:', this.rootPage !== 'OnboardingPage' && this.rootPage !== 'WelcomePage')
      console.log('isModalShown:', !isModalShown)
      console.log('isAppPaused:', !isAppPaused)
      console.log('isLoggedIn:', isLoggedIn)
      console.log('pin:', !!pin)

      console.log('showModal:',
        this.rootPage !== 'OnboardingPage' &&
        this.rootPage !== 'WelcomePage' &&
        !isModalShown &&
        !isAppPaused &&
        !!pin &&
        isLoggedIn
      )

      if (isAppPaused) {
        return this.storage.set('isAppPaused', false);
      } else if (
        this.rootPage !== 'OnboardingPage' &&
        this.rootPage !== 'WelcomePage' &&
        !isModalShown &&
        !isAppPaused &&
        !!pin &&
        isLoggedIn
      ) {
        return this.utils.showModal('VerificationCodePage', {
          status: 'verify',
          title: 'Wallet is secured',
          subtitle: 'Please enter your PIN',
          invalidPinMessage: 'Incorrect pin. Please try again',
          pin: pin
        });
      }
    });
  }
}
