import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
  BarcodeScanResult
} from '@ionic-native/barcode-scanner';

/*
  Generated class for the BarcodeScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarcodeScannerProvider {
  private barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private app: App,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner
  ) {
    this.barcodeScannerOptions = {
      prompt: '',
      resultDisplayDuration: 0
    };
  }

  /**
   * Gets the data returned from QR scan unless if it is cancelled.
   * @param page Redirect to this page when QR scan is cancelled.
   */
  getData(page: string): Promise<any> {
    return this.storage
      .set('isLocked', false)
      .then(_ => {
        console.log('isLocked', _)
        return this.barcodeScanner.scan(this.barcodeScannerOptions);
      })
      .then((result: BarcodeScanResult) => {
        if (result.cancelled) {
          return this.app.getActiveNav().setRoot(
            page,
            {},
            {
              animate: true,
              direction: 'forward'
            }
          ).then(_ => false);
        }

        return JSON.parse(result.text);
      });
  }
}
