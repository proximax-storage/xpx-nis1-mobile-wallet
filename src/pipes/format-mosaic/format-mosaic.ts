import { Pipe, PipeTransform } from '@angular/core';
import { NemProvider } from '../../providers/nem/nem';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({
  name: 'formatMosaic',
})
export class FormatMosaicPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return value / Math.pow(10, isNaN(exp) ? 1 : exp);
  }
}
