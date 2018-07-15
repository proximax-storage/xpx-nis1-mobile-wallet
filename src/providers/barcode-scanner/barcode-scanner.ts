import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
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

  constructor(private app: App, private barcodeScanner: BarcodeScanner) {
    this.barcodeScannerOptions = {
      prompt: '',
      resultDisplayDuration: 0
    };
  }

  getData(): Promise<any> {
    return this.barcodeScanner
      .scan(this.barcodeScannerOptions)
      .then((result: BarcodeScanResult) => {
        if (result.cancelled) {
          this.app.getActiveNav().setRoot(
            'WalletListPage',
            {},
            {
              animate: true,
              direction: 'forward'
            }
          );
        }

        return JSON.parse(result.text);
      });
  }
}
