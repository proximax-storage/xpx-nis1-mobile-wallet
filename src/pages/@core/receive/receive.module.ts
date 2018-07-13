import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxCurrencyModule } from 'ngx-currency';

import { ReceivePage } from './receive';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    ReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivePage),
    NgxCurrencyModule,
    DirectivesModule
  ],
})
export class ReceivePageModule {}
