import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMosaicConfirmationPage } from './send-mosaic-confirmation';
import { PipesModule } from '../../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SendMosaicConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMosaicConfirmationPage),
    PipesModule
  ],
})
export class SendMosaicConfirmationPageModule {}
