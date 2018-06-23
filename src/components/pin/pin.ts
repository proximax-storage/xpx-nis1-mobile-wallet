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
  @Input() title: String = 'Enter pin';
  @Input() subtitle: String = 'In order to continue you must enter your pin code';

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
