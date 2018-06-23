import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpCodePage } from './otp-code';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    OtpCodePage,
  ],
  imports: [
    IonicPageModule.forChild(OtpCodePage),
    ComponentsModule
  ],
})
export class OtpCodePageModule {}
