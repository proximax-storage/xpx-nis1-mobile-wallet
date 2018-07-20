import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';

  constructor(
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private platform: Platform,
    private storage: Storage,
    private app: App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initOnPauseResume();
    });
  }

  initOnPauseResume() {
    this.platform.pause.subscribe(() => {
      this.storage.get('pin').then(pin => {
        if (pin) this.storage.set('isLocked', true);
      });
    });

    this.platform.resume.subscribe(() => {
      Promise.all([this.storage.get('isLocked'), this.storage.get('pin')]).then(
        results => {
          const isLocked = results[0];
          const pin = results[1];

          if (isLocked) {
            this.app.getRootNav().setRoot(
              'VerificationCodePage',
              { status: 'verify', pin: pin },
              {
                animate: true,
                direction: 'forward'
              }
            );
          }
        }
      );
    });
  }
}
