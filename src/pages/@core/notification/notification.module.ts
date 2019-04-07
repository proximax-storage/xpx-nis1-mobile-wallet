import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    MarkdownModule.forChild(),
  ],
})
export class NotificationPageModule {}
