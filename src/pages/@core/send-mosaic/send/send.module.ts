import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendPage } from './send';

import { NgxCurrencyModule } from "ngx-currency";
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
  declarations: [
    SendPage,
  ],
  imports: [
    IonicPageModule.forChild(SendPage),
    NgxCurrencyModule,
    DirectivesModule
  ],
})
export class SendPageModule {}
