import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ngx-pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Input() title: String = 'Let\'s setup your PIN CODE';
  @Input() subtitle: String = 'PIN CODE serves as a secondary form of verification. Having a PIN CODE provides additional security capability on your wallet.';

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
    if (this.pin.length === 4) this.emitEvent();
  }

  erase() {
    if (this.pin.length) this.pin = this.pin.slice(0, -1);
  }
}
