import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactDeletePage } from './contact-delete';

@NgModule({
  declarations: [
    ContactDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactDeletePage),
  ],
})
export class ContactDeletePageModule {}
