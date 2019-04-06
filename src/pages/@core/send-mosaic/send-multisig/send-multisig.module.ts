import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMultisigPage } from './send-multisig';
import { NgxCurrencyModule } from 'ngx-currency';
import { DirectivesModule } from '../../../../directives/directives.module';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SendMultisigPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMultisigPage),
    NgxCurrencyModule,
    DirectivesModule,
    PipesModule
  ],
})
export class SendMultisigPageModule {}
