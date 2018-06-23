import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMosaicSelectPage } from './send-mosaic-select';

@NgModule({
  declarations: [
    SendMosaicSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMosaicSelectPage),
  ],
})
export class SendMosaicSelectPageModule {}
