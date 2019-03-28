import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";

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
export class PinComponent implements OnChanges {
  @Input() title: String = 'Let\'s setup your PIN CODE';
  @Input() subtitle: String = 'PIN CODE serves as a secondary form of verification. Having a PIN CODE provides additional security capability on your wallet.';
  @Input() previousPin = '';
  @Input() isVerify = false;

  inputPin: string = '';
  maxLength: number = 6;

  styleClasses = {
    miss: false,
  };

  @Output() submit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(val) {
    if ('isVerify' in val && 'previousPin' in val) {
      this.isVerify = val['isVerify'].currentValue;
      this.previousPin = val['previousPin'].currentValue;
    }
  }

  emitEvent() {
    this.submit.emit(this.inputPin);
  }

  handleInput(pin: string) {
    this.styleClasses.miss = false;
    
    if (this.inputPin.length !== this.maxLength) this.inputPin += pin;
    if (this.inputPin.length === this.maxLength) { 
      if (this.isVerify && (this.previousPin !== this.inputPin)) {
        // this.styleClasses.miss = true;
      } 
      this.emitEvent();
      this.inputPin = '';
      console.log('PinComponent : this.isVerify', this.isVerify);
      console.log('PinComponent : this.previousPin', this.previousPin);
      console.log('PinComponent : his.styleClasses.miss', this.styleClasses.miss);
     
      
    }
  }

  public backspace() {
    if (this.inputPin.length) this.inputPin = this.inputPin.slice(0, -1);
  }
}
