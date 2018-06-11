import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { App } from '../../providers/app/app';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html'
})
export class OnboardingPage {
  App = App;

  @ViewChild(Slides) ionSlide: Slides;

  slides: Array<{
    title: string;
    description: string;
    image: string;
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  init() {
    this.slides = [
      {
        title: 'NEM Smart Asset System',
        description: `The NEM Smart Asset System allows you to totally customize how you use the NEM blockchain. First, your Namespace defines your home on the blockchain where you can name your own Mosaics, provide easy-to-remember names to user addresses, and more.`,
        image: App.SLIDES.SLIDE1
      },
      {
        title: 'Use Case Examples',
        description:
          'NEM’s modular Smart Asset system enables businesses to build an incredible variety of real world application uses. By using NEM’s built-in features to define your Smart Assets and connect them together, you can represent almost any system of business transactions on the blockchain with minimal development.',
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'Platform Architecture',
        description:
          'NEM’s architecture is designed for both simplicity and flexibility of development. The blockchain itself is supported by nodes running NEM-provided software that implements NEM’s feature set and unique consensus mechanism.',
        image: App.SLIDES.SLIDE3
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  gotoWelcome() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    })
  }
}
