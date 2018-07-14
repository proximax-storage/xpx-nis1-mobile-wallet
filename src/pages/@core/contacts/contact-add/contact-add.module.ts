import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactAddPage } from './contact-add';
import { DirectivesModule } from '../../../../directives/directives.module';

@NgModule({
  declarations: [
    ContactAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactAddPage),
    DirectivesModule
  ],
})
export class ContactAddPageModule {}
