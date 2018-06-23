import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendContactSelectPage } from './send-contact-select';

@NgModule({
  declarations: [
    SendContactSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SendContactSelectPage),
  ],
})
export class SendContactSelectPageModule {}
