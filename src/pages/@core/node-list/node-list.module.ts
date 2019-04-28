import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeListPage } from './node-list';

@NgModule({
  declarations: [
    NodeListPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeListPage),
  ],
})
export class NodeListPageModule {}
