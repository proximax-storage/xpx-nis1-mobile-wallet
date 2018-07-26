import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletBackupPage } from './wallet-backup';

@NgModule({
  declarations: [
    WalletBackupPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletBackupPage),
  ],
})
export class WalletBackupPageModule {}
