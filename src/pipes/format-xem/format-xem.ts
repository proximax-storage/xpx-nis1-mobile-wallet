import { Pipe, PipeTransform } from '@angular/core';
import { XEM } from 'nem-library';

import { NemProvider } from '../../providers/nem/nem';

/**
 * Generated class for the FormatXemPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatXEM'
})
export class FormatXemPipe implements PipeTransform {
  constructor(public nem: NemProvider) {}

  transform(xem: number): any {
    return xem / Math.pow(10, XEM.DIVISIBILITY);
  }
}
