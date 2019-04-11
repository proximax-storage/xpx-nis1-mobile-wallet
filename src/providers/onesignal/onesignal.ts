import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class oneSignalProvider {

  constructor(private storage: Storage, private oneSignal: OneSignal) {
  }

  public connect(){
    this.oneSignal.startInit('93db0417-8cb0-4054-b18b-d33205b6df00', '746717985112');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      return this.storage.get("sennnotific").then(sennnotific => {
        let notific: any[] = sennnotific;

        if (notific) {
          notific.push({ notific: data.payload });
        } else {
          notific = [{ notific: data.payload }]; // Genesis post
        }
        return this.storage.set("sennnotific", notific);
      })
    });

    this.oneSignal.endInit();
  }

  public sennnotific() {
    return this.storage.get("sennnotific").then(notific => {
      let sennnotific: any[] = notific;
      console.log("notificaciones en el local Storage", sennnotific);
      return sennnotific;
    })
  }

  public getSeenPosts(): Promise<any> {
    return this.storage.get("seenPosts");
  }

}
