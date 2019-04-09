import { TapticEngine } from '@ionic-native/taptic-engine';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";

/**
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "ngx-pin",
  templateUrl: "pin.html"
})
export class PinComponent implements OnChanges {
  @Input() title: string = "Setup PIN";
  @Input() subtitle: string =
    "The following 6 PIN number is used to access your wallet. Please don't forget it: we won't be able to access your account.";
  @Input() previousPin = "";
  @Input() isVerify = false;

  inputPin: string = "";
  maxLength: number = 6;
  keypadNums: number[];

  styleClasses = {
    miss: false
  };

  @Output() submit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private haptic: TapticEngine) {
    console.log(this.random9DigitNumberNotStartingWithZero());
    console.log(
      this.random9DigitNumberNotStartingWithZero()
        .toString()
        .split(",")
        .map(Number)
    );
    this.keypadNums = this.random9DigitNumberNotStartingWithZero()
      .toString()
      .split(",")
      .map(Number);
  }

  ngOnChanges(val) {
    if ("isVerify" in val && "previousPin" in val) {
      this.isVerify = val["isVerify"].currentValue;
      this.previousPin = val["previousPin"].currentValue;
    }
  }

  emitEvent() {
    this.submit.emit(this.inputPin);
  }

  handleInput(pin: string) {
    this.styleClasses.miss = false;

    if (this.inputPin.length !== this.maxLength) {
      this.inputPin += pin;
      console.log("PinComponent : this.inputPin", this.inputPin);
      console.log("PinComponent : this.inputPin.length", this.inputPin.length);

      console.log("PinComponent : this.previousPin", this.previousPin);
      console.log(
        "PinComponent : this.previousPin.length :",
        this.previousPin.length
      );

      console.log(
        "PinComponent : this.styleClasses.miss",
        this.styleClasses.miss
      );
      console.log("PinComponent : this.isVerify", this.isVerify);

      this.inputPin.length;

      if (this.inputPin.length === this.maxLength) {
        console.log("PinComponent : Pin length===", this.inputPin.length);
        if (this.isVerify && this.previousPin !== this.inputPin) {
          console.log("PinComponent : this.inputPin", this.inputPin.length);
          console.log(
            "PinComponent : this.inputPin.length",
            this.inputPin.length
          );

          console.log("PinComponent : this.previousPin", this.previousPin);
          console.log(
            "PinComponent : this.previousPin.length :",
            this.previousPin.length
          );

          console.log(
            "PinComponent : this.styleClasses.miss",
            this.styleClasses.miss
          );
          console.log("PinComponent : this.isVerify", this.isVerify);

          this.styleClasses.miss = true;
          this.haptic.notification({ type: 'error' });
        }

        this.emitEvent();
        this.inputPin = "";
      }
    }
  }

  public backspace() {
    if (this.inputPin.length) this.inputPin = this.inputPin.slice(0, -1);
  }

  random9DigitNumberNotStartingWithZero() {
    // I did not include the zero, for the first digit
    var digits = "123456789".split(""),
      first = this.shuffle(digits).pop();
    // Add "0" to the array
    digits.push("0");
    return parseInt(
      first +
        this.shuffle(digits)
          .join("")
          .substring(0, 9),
      10
    )
      .toString()
      .split("");
  }

  shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
}
