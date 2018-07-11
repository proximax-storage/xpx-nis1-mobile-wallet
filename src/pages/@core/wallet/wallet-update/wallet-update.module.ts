import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletUpdatePage } from './wallet-update';

@NgModule({
  declarations: [
    WalletUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(WalletUpdatePage),
  ],
})
export class WalletUpdatePageModule {}
