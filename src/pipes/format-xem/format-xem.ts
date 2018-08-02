import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { XEM } from 'nem-library';

/**
 * Generated class for the FormatXemPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatXEM'
})
export class FormatXemPipe implements PipeTransform {
  constructor(public decimalPipe: DecimalPipe) {}

  transform(xem: number): any {
    return this.decimalPipe.transform(xem, `2-${XEM.DIVISIBILITY}`);
  }
}
