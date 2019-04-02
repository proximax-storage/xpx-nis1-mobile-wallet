import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PinComponent } from './pin/pin';
import { ModalHeaderComponent } from './modal-header/modal-header';
@NgModule({
  declarations: [
    PinComponent,
    ModalHeaderComponent
  ],
  imports: [IonicModule],
  exports: [
    PinComponent,
    ModalHeaderComponent
  ]
})
export class ComponentsModule { }
