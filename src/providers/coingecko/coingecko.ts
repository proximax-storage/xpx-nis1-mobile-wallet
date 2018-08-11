import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';

/*
  Generated class for the CoingeckoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoingeckoProvider {

  url = 'https://api.coingecko.com/api/v3';

  constructor(public http: HttpClient) {
    console.log('Hello CoingeckoProvider Provider');
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/coins`);
  }

  getDetails(coin_id: string): Observable<any> {
    return this.http.get(`${this.url}/coins/${coin_id}`);
  }

  getPrices(coin_id: string, currency: string, days: number): Observable<any> {
    return this.http.get(`${this.url}/coins/${coin_id}/market_chart?vs_currency=${currency}&days=${days}`)
      .map((data: any) => {
        data.prices = data.prices.map(price => {
          price[0] = moment(price[0]).format('MMM DD, YYYY hh:mm:a');
          price[1] = parseFloat(price[1].toFixed(4));
          return price;
        });
        return data;
      });
  }

}
