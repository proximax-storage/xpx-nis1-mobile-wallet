import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletAddPage } from './wallet-add';

@NgModule({
  declarations: [
    WalletAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletAddPage),
  ],
})
export class WalletAddPageModule {}
