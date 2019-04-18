import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletBackupQrcodePage } from './wallet-backup-qrcode';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  declarations: [
    WalletBackupQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(WalletBackupQrcodePage),
    NgxKjuaModule
  ],
})
export class WalletBackupQrcodePageModule {}
