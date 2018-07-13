import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxKjuaModule } from 'ngx-kjua';

import { PrivateKeyPage } from './private-key';

@NgModule({
  declarations: [
    PrivateKeyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivateKeyPage),
    NgxKjuaModule,
  ],
})
export class PrivateKeyPageModule {}
