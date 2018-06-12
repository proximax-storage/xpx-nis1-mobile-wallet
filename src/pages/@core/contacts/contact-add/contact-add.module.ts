import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactAddPage } from './contact-add';

@NgModule({
  declarations: [
    ContactAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactAddPage),
  ],
})
export class ContactAddPageModule {}
