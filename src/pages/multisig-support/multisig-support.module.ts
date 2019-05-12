import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultisigSupportPage } from './multisig-support';

@NgModule({
  declarations: [
    MultisigSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(MultisigSupportPage),
  ],
})
export class MultisigSupportPageModule {}
