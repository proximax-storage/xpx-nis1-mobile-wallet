import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NamespaceUpdatePage } from './namespace-update';

@NgModule({
  declarations: [
    NamespaceUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(NamespaceUpdatePage),
  ],
})
export class NamespaceUpdatePageModule {}
