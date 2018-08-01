import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinPriceChartPage } from './coin-price-chart';

@NgModule({
  declarations: [
    CoinPriceChartPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinPriceChartPage),
  ],
})
export class CoinPriceChartPageModule {}
