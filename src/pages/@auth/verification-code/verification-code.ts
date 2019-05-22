import { TapticEngine } from '@ionic-native/taptic-engine';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AlertProvider } from "../../../providers/alert/alert";
import { UtilitiesProvider } from "../../../providers/utilities/utilities";
import { HapticProvider } from '../../../providers/haptic/haptic';
import { PinProvider } from '../../../providers/pin/pin';
import * as BcryptJS from "bcryptjs";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the VerificationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-verification-code",
  templateUrl: "verification-code.html"
})
export class VerificationCodePage {
  pinTitle: string;
  invalidPinMessage: string;

  previousPin = "";
  isVerify = false;
  pinSubtitle: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    private alertProvider: AlertProvider,
    private utils: UtilitiesProvider,
    private haptic: HapticProvider,
    private pin: PinProvider,
    private translateService: TranslateService
  ) { }

  ionViewWillEnter() {
    console.log(
      "VerificationCodePage :: ionViewWillEnter",
      !this.navParams.data.destination &&
      this.navParams.data.status === "verify"
    );

    if (
      !this.navParams.data.destination &&
      this.navParams.data.status === "verify"
    ) {
      this.utils.disableHardwareBack();
    } else {
      this.utils.disableHardwareBack();
      // this.utils.setHardwareBackModal(this.viewCtrl);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad VerificationCodePage");
    console.log(
      this.navParams.data,
      this.navParams.data.title,
      this.navParams.data.subtitle,
      this.navParams.data.invalidPinMessage
    );

    const setupPinTitle = this.translateService.instant("APP.PIN.SETUP.TITLE");
    const setupPinSubTitle = this.translateService.instant("APP.PIN.SETUP.DESC");

    this.pinTitle = this.navParams.data.title
      ? this.navParams.data.title
      : setupPinTitle;

    this.pinSubtitle = this.navParams.data.subtitle
      ? this.navParams.data.subtitle
      : setupPinSubTitle;

    this.invalidPinMessage = this.navParams.data.invalidPinMessage
      ? this.navParams.data.invalidPinMessage
      : "Your pin is not equal to previous one. Please try again.";


    // Used in pin component to compare previous and current pin

    if (this.navParams.data.status === "verify") {
      this.isVerify = true;
      this.previousPin = this.navParams.data.pin;
      console.log("LOG: VerificationCodePage -> ionViewDidLoad -> this.previousPin", this.previousPin)
    }

    if (this.navParams.data.status === "confirm") {
      this.isVerify = true;
      this.pin.get().then(pin => {
        console.log("LOG: VerificationCodePage -> ionViewDidLoad -> pin", pin)
        this.previousPin = pin.toString();
      });
    }
  }

  onSubmit(pin) {

    const verifyPinTitle = this.translateService.instant("APP.PIN.VERIFY.TITLE");

    let status: string = this.navParams.data.status;
    let destination = this.navParams.data.destination;
    let pinParams = this.navParams.data.pin;

    if (status === 'setup') {
      console.log("status === 'setup'");
      console.log("VerificationCodePage : pin", pin);
      let page = "VerificationCodePage";
      let data: any = {
        status: 'verify',
        title: verifyPinTitle,
        subtitle: " ",
        pin: this.pin.hash(pin),
        destination: 'TabsPage'
      };
      return this.utils.showModal(page, data);
    }

    if (status === "verify" && BcryptJS.compareSync(pin, pinParams)) {
      console.log("status === 'verify'");

      this.haptic.notification({ type: 'success' });
      let page = "TabsPage";
      this.isVerify = true;
      this.previousPin = pin;

      return this.pin.set(pin)
        .then(_ => {
          return this.storage.set("isModalShown", false);
        })
        .then(_ => {
          if (page) {
            return this.navCtrl.setRoot(page, {
              animate: true,
              direction: "forward"
            });
          } else {
            this.viewCtrl.dismiss();
          }
        });

    }

    if (status === "confirm") {
      console.log("status === 'confirm'");
      this.pin.compare(pin).then(isMatch => {
        console.log("TCL: VerificationCodePage -> onSubmit -> isMatch", isMatch)

        if (isMatch) {
          this.haptic.notification({ type: 'success' });
          let page = "TabsPage";
          this.isVerify = true;
          this.previousPin = pin;

          return this.pin.set(pin)
            .then(_ => {
              return this.storage.set("isModalShown", false);
            })
            .then(_ => {
              if (page) {
                return this.navCtrl.setRoot(page, {}, {
                  animate: true,
                  direction: "forward"
                });
              } else {
                this.viewCtrl.dismiss();
              }
            });
        }

      })
    }
  }
}
