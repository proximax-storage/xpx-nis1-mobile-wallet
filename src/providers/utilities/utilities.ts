import { Injectable } from '@angular/core';
import { ModalController, Platform, ViewController, NavController, App, Events } from 'ionic-angular';
import { MosaicTransferable } from 'nem-library';

import { App as AppConfig } from './../app/app';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {
  AppConfig = AppConfig;

  constructor(
    private app: App,
    private modalCtrl: ModalController,
    private platform: Platform,
    private storage: Storage,
    private events: Events,
  ) {
    console.log('Hello UtilitiesProvider Provider');
  }

  setTabIndex(index) {
    return this.platform.registerBackButtonAction(() => {
      this.events.publish('tab:back', index);
    }, 0);
  }

  setHardwareBack(nav?: NavController) {
    return this.platform.registerBackButtonAction(() => {
      if (nav) nav.pop();
    }, 0);
  }

  setHardwareBackToPage(page: string) {
    return this.platform.registerBackButtonAction(() => {
      this.setRoot(page);
    }, 0);
  }

  setHardwareBackModal(viewCtrl: ViewController) {
    return this.platform.registerBackButtonAction(() => {
      viewCtrl.dismiss();
    }, 0);
  }

  setRoot(page: string, data = {}) {
    this.app.getRootNavs()[0].setRoot(page, data, {
      animate: true,
      direction: 'backward'
    });
  }

  /**
   * Get the logo of the mosaics
   * @param mosaic The mosaic object for querying the logo
   */
  getLogo(mosaic: MosaicTransferable) {
    if (
      mosaic.mosaicId.namespaceId === 'nem' &&
      mosaic.mosaicId.name === 'xem'
    ) {
      return AppConfig.LOGO.NEM;
    } else if (
      mosaic.mosaicId.namespaceId === 'prx' &&
      mosaic.mosaicId.name === 'xpx'
    ) {
      return AppConfig.LOGO.XPX;
    } else if (
      mosaic.mosaicId.namespaceId === 'appsolutely' &&
      mosaic.mosaicId.name === 'lyl'
    ) {
      return AppConfig.LOGO.LYL;
    } else {
      return 'https://image.flaticon.com/icons/svg/1018/1018780.svg';
    }
  }

  /**
   * Show inset modal
   * @param page { Component || string } The page to set as modal.
   * @param data { Object } Any data to pass when modal is shown
   */
  showModal(page, data = {}): Observable<any> {
    const modal = this.modalCtrl.create(page, data, {
      enableBackdropDismiss: false,
      showBackdrop: true
    });

    this.storage.set('isModalShown', true).then(() => {
      modal.present();
    });

    return new Observable(observer => {
      modal.onDidDismiss(data => {
        observer.next(data);
      });
    });
  }

  /**
   * Show inset modal
   * @param page { Component || string } The page to set as modal.
   * @param data { Object } Any data to pass when modal is shown
   */
  showInsetModal(page, data = {}, size = ''): Observable<any> {
    const modal = this.modalCtrl.create(page, data, {
      cssClass: `inset-modal ${size}`,
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
