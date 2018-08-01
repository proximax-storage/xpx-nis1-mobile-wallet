import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoinPriceChartProvider } from '../../providers/coin-price-chart/coin-price-chart';
import { CoingeckoProvider } from '../../providers/coingecko/coingecko';

/**
 * Generated class for the CoinPriceChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-price-chart',
  templateUrl: 'coin-price-chart.html'
})
export class CoinPriceChartPage {
  durations: Array<{ label: string; value: number }>;
  selectedDuration: { label: string; value: number };
  selectedCoin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public coingeckoProvider: CoingeckoProvider,
    public coinPriceChartProvider: CoinPriceChartProvider
  ) {
    this.durations = [
      { label: '1D', value: 1 },
      { label: '7D', value: 7 },
      { label: '30D', value: 30 },
      { label: '6M', value: 182 },
      { label: '1Y', value: 365 }
    ];
    this.selectedDuration = this.durations[0];

    console.log('navParams.data', this.navParams.data);
    this.coingeckoProvider.getDetails(this.navParams.data).subscribe(coin => {
      this.selectedCoin = coin;
      this.select(this.selectedDuration);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinPriceChartPage');
  }

  select(duration) {
    this.selectedDuration = duration;
    this.coinPriceChartProvider.load(
      this.selectedCoin,
      this.selectedDuration.value,
      'usd'
    );
  }
}
