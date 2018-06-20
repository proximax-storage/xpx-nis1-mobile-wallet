import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivateKeyPage } from './private-key';

@NgModule({
  declarations: [
    PrivateKeyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivateKeyPage),
  ],
})
export class PrivateKeyPageModule {}
