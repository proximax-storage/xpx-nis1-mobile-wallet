import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUpdatePage } from './contact-update';

@NgModule({
  declarations: [
    ContactUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUpdatePage),
  ],
})
export class ContactUpdatePageModule {}
