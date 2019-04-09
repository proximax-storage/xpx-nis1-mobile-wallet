import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { MarkdownModule } from '@ngx-markdown/core';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    MarkdownModule.forChild(), PipesModule
  ],
})
export class NotificationPageModule {}
