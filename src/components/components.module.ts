import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PinComponent } from './pin/pin';
import { OtpCodeComponent } from './otp-code/otp-code';
@NgModule({
	declarations: [PinComponent,
    OtpCodeComponent],
	imports: [IonicModule],
	exports: [PinComponent,
    OtpCodeComponent]
})
export class ComponentsModule {}
