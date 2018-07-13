import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxKjuaModule } from 'ngx-kjua';

import { SettingListPage } from './setting-list';

@NgModule({
  declarations: [
    SettingListPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingListPage),
    NgxKjuaModule
  ],
})
export class SettingListPageModule {}
