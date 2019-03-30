import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxCurrencyModule } from 'ngx-currency';

import { ReceivePage } from './receive';
import { DirectivesModule } from '../../../directives/directives.module';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  declarations: [
    ReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivePage),
    NgxCurrencyModule,
    DirectivesModule,
    NgxKjuaModule,
  ],
})
export class ReceivePageModule {}
