import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletBackupPage } from './wallet-backup';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  declarations: [
    WalletBackupPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletBackupPage),
    NgxKjuaModule
  ],
})
export class WalletBackupPageModule {}
