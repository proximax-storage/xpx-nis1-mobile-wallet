import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUpdatePage } from './contact-update';
import { DirectivesModule } from './../../../../directives/directives.module';

@NgModule({
  declarations: [
    ContactUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUpdatePage),
    DirectivesModule
  ],
})
export class ContactUpdatePageModule {}
