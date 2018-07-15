import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NamespaceCreatePage } from './namespace-create';

@NgModule({
  declarations: [
    NamespaceCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(NamespaceCreatePage),
  ],
})
export class NamespaceCreatePageModule {}
