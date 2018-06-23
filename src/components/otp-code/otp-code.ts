import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Generated class for the OtpCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ngx-otp-code',
  templateUrl: 'otp-code.html'
})
export class OtpCodeComponent {

  @Input() title: String = 'Enter verification code';
  @Input() subtitle: String = 'In order to continue you must enter verification code';

  pin: string = '';

  @Output() submit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  emitEvent() {
    this.submit.emit(this.pin);
  }

  handleInput(pin: string) {
    if (pin === 'clear') {
      this.pin = '';
      return;
    }

    this.pin += pin;
    if (this.pin.length === 6) this.emitEvent();
  }

  erase() {
    if (this.pin.length) this.pin = this.pin.slice(0, -1);
  }

}
