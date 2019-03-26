import { Pipe, PipeTransform } from '@angular/core';
import { CoingeckoProvider } from '../../providers/coingecko/coingecko';

/**
 * Generated class for the GetMarketPricePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getMarketPrice'
})
export class GetMarketPricePipe implements PipeTransform {
  constructor(private coingeckoProvider: CoingeckoProvider) {}

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let coinId = '';

    if (value === 'xem') {
      coinId = 'nem';
    } else if (value === 'xpx') {
      coinId = 'proximax';
    } else if (value === 'npxs') {
      coinId = 'pundi-x';
    } 
    // Add more coins here

    if(coinId != undefined) {
      return this.coingeckoProvider
      .getDetails(coinId)
      .toPromise()
      .then(details => {
        return details.market_data.current_price.usd;
      }).catch(err => {
        return 0;
      })
    }

  }
}
