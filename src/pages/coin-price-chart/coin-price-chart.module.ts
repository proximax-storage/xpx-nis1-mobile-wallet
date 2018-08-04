import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgXtruncateModule } from 'ngx-truncate';
import { TooltipsModule } from 'ionic-tooltips';

import { PipesModule } from '../../pipes/pipes.module';
import { CoinPriceChartPage } from './coin-price-chart';

@NgModule({
  declarations: [
    CoinPriceChartPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinPriceChartPage),
    NgXtruncateModule,
    TooltipsModule,
    PipesModule
  ],
})
export class CoinPriceChartPageModule {}
