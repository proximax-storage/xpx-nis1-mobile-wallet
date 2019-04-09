import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgXtruncateModule } from 'ngx-truncate';
import { TooltipsModule } from 'ionic-tooltips';

import { CoinPriceChartPage } from './coin-price-chart';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '../../../app/shared.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CoinPriceChartPage
  ],
  entryComponents: [
  ],
  imports: [
    IonicPageModule.forChild(CoinPriceChartPage),
    NgXtruncateModule,
    TooltipsModule,
    PipesModule,
    SharedModule,
    ComponentsModule
  ],
})
export class CoinPriceChartPageModule {}
