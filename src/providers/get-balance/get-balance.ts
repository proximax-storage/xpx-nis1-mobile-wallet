import { NemProvider } from './../nem/nem';
import { Injectable } from '@angular/core';

import {
  Address,
  MosaicTransferable,
  MosaicId,
  MosaicProperties,
} from 'nem-library';
import { Observable } from 'rxjs/Observable';

import findIndex from 'lodash/findIndex';

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
    // ProximaX
    const XPX_MOSAIC_ID = new MosaicId('prx', 'xpx');
    const XPX_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const XPX = new MosaicTransferable(XPX_MOSAIC_ID, XPX_MOSAIC_PROPERTIES, 0);

    // PUNDIX
    const NPXS_MOSAIC_ID = new MosaicId('pundix', 'npxs');
    const NPXS_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const NPXS = new MosaicTransferable(NPXS_MOSAIC_ID, NPXS_MOSAIC_PROPERTIES, 0);

    // SPORTSFIX
    const SFT_MOSAIC_ID = new MosaicId('sportsfix', 'sft');
    const SFT_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const SFT = new MosaicTransferable(SFT_MOSAIC_ID, SFT_MOSAIC_PROPERTIES, 0);

    // XARCADE
    const XAR_MOSAIC_ID = new MosaicId('xarcade', 'xar');
    const XAR_MOSAIC_PROPERTIES = new MosaicProperties(
      6,
      9000000000,
      true,
      false
    );
    const XAR = new MosaicTransferable(XAR_MOSAIC_ID, XAR_MOSAIC_PROPERTIES, 0);

    return [XPX, NPXS, SFT, XAR];
  }

  mosaics(address: Address): Observable<Array<MosaicTransferable>> {
    const XPX = this.generateInitialMosaics()[0];
    const NPXS = this.generateInitialMosaics()[1];
    const SFT = this.generateInitialMosaics()[2];
    const XAR = this.generateInitialMosaics()[3];


    return new Observable(observer => {
      this.nemProvider
        .getBalance(address)
        .then((mosaics: Array<MosaicTransferable>) => {
          const XPX_INDEX = findIndex(mosaics, {
            mosaicId: { namespaceId: 'prx', name: 'xpx' }
          });
          const NPXS_INDEX = findIndex(mosaics, {
            mosaicId: { namespaceId: 'pundix', name: 'npxs' }
          });

          const SFT_INDEX = findIndex(mosaics, {
            mosaicId: { namespaceId: 'sportsfix', name: 'sft' }
          });

          const XAR_INDEX = findIndex(mosaics, {
            mosaicId: { namespaceId: 'xarcade', name: 'xar' }
          });

          if (XPX_INDEX < 0) {
            mosaics.splice(0, 0, XPX);
          }
          if (NPXS_INDEX < 0) {
            mosaics.splice(2, 0, NPXS);
          }
          if (SFT_INDEX < 0) {
            mosaics.splice(3, 0, SFT);
          }
          if (XAR_INDEX < 0) {
            mosaics.splice(4, 0, XAR);
          }

          observer.next(mosaics);
        })
        .catch(observer.error);
    });
  }
}
