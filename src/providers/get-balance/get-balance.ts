import { NemProvider } from './../nem/nem';
import { Injectable } from '@angular/core';

import {
  Address,
  MosaicTransferable,
  MosaicId,
  MosaicProperties
} from 'nem-library';
import { Observable } from 'rxjs/Observable';

import find from 'lodash/find';

/*
  Generated class for the GetBalanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetBalanceProvider {
  constructor(private nemProvider: NemProvider) {
    console.log('Hello GetBalanceProvider Provider');
  }

  private generateInitialMosaics(): Array<MosaicTransferable> {
    const XPX_MOSAIC_ID = new MosaicId('prx', 'xpx');
    const XPX_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const XPX = new MosaicTransferable(XPX_MOSAIC_ID, XPX_MOSAIC_PROPERTIES, 0);

    const LYL_MOSAIC_ID = new MosaicId('appsolutely', 'lyl');
    const LYL_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const LYL = new MosaicTransferable(LYL_MOSAIC_ID, LYL_MOSAIC_PROPERTIES, 0);

    return [XPX, LYL];
  }

  mosaics(address: Address): Observable<Array<MosaicTransferable>> {
    const XPX = this.generateInitialMosaics()[0];
    const LYL = this.generateInitialMosaics()[1];

    return new Observable(observer => {
      this.nemProvider
        .getBalance(address)
        .then((mosaics: Array<MosaicTransferable>) => {
          mosaics.map(mosaic => {
            if (
              mosaic.mosaicId.namespaceId !== 'prx' &&
              mosaic.mosaicId.name !== 'xpx'
            ) {
              mosaics.push(XPX);
            }

            if (
              mosaic.mosaicId.namespaceId !== 'appsolutely' &&
              mosaic.mosaicId.name !== 'lyl'
            ) {
              mosaics.push(LYL);
            }
          });

          observer.next(mosaics);
        })
        .catch(observer.error);
    });
  }
}