import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MosaicTransferable } from 'nem-library';

import { App } from './../app/app';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

  App = App;

  constructor(private modalCtrl: ModalController) {
    console.log('Hello UtilitiesProvider Provider');
  }

  /**
   * Get the logo of the mosaics
   * @param mosaic The mosaic object for querying the logo
   */
  getLogo(mosaic: MosaicTransferable) {
    if(mosaic.mosaicId.namespaceId === 'nem' && mosaic.mosaicId.name === 'xem') {
      return App.LOGO.NEM;
    } else if(mosaic.mosaicId.namespaceId === 'prx' && mosaic.mosaicId.name === 'xpx') {
      return App.LOGO.XPX;
    } else if(mosaic.mosaicId.namespaceId === 'appsolutely' && mosaic.mosaicId.name === 'lyl') {
      return App.LOGO.LYL;
    }
  }

  /**
   * Show inset modal
   * @param page { Component || string } The page to set as modal.
   * @param data { Object } Any data to pass when modal is shown
   */
  showInsetModal(page, data = {}): Observable<any> {
    const modal = this.modalCtrl.create(page, data, {
      cssClass: 'inset-modal',
      enableBackdropDismiss: true,
      showBackdrop: true
    });
    modal.present();

    return new Observable(observer => {
      modal.onDidDismiss(data => {
        observer.next(data);
      });
    });
  }
}
