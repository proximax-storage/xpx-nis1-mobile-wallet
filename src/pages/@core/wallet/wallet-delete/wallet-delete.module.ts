import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletDeletePage } from './wallet-delete';

@NgModule({
  declarations: [
    WalletDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(WalletDeletePage),
  ],
})
export class WalletDeletePageModule {}
