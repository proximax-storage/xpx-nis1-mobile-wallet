import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as BcryptJS from "bcryptjs";

/*
  Generated class for the PinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PinProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello PinProvider Provider');
  }

  public get() {
    return new Promise((resolve, reject) => {
      this.storage.get("pin").then(pin => {
        resolve(pin);
      }).catch(error => {
        reject(error);
      })
    });
  }

  public set(pin) {
    const hashedPin = BcryptJS.hashSync(pin, 8)
    return new Promise((resolve, reject) => {
      this.storage.set("pin", hashedPin).then(pin => {
        resolve(pin);
      }).catch(error => {
        reject(error);
      })
    });
  }

  public hash(pin) {
    return BcryptJS.hashSync(pin, 8);
  }

  public compare(currentPin) {
    return new Promise((resolve, reject) => {
      this.storage.get("pin").then(previousPin => {
        if (BcryptJS.compareSync(currentPin, previousPin)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(error => {
        reject(error);
      })
    });
  }

  // private saveCurrentPin(currentPin) {
  //   this.storage.set("currentPin", currentPin).then(pin => {
  //     console.log(pin);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }

  // public getCurrentPin() {
  //   return new Promise((resolve, reject) => {
  //     this.storage.get("currentPin").then(previousPin => {
  //       if(previousPin) {
  //         resolve(previousPin);
  //       } else {
  //         resolve(false);
  //       }
        
  //     }).catch(error => {
  //       reject(error);
  //     })
  //   });

  // }

  public removeCurrentPin() {
    this.storage.set("currentPin", false).then(pin => {
      console.log(pin);
    }).catch(error => {
      console.log(error);
    })
  }



  public reset() {
    return new Promise((resolve, reject) => {
      this.storage.set("pin", false).then(pin => {
        this.removeCurrentPin();
        resolve(pin);
      }).catch(error => {
        reject(error);
      })
    });
  }

}
