import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { App } from '../../providers/app/app';
import { MockDataProvider } from '../../providers/mock-data/mock-data';

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
  isPreview: boolean = false;

  @ViewChild(Slides) ionSlide: Slides;

  slides: Array<{
    title: string;
    description: string;
    image: string;
    isSmall?: boolean;
  }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private mockData: MockDataProvider
  ) {

    this.isPreview = this.navParams.get('preview');
    this.init();
    this.mockData.init(); // Uncomment to load mock data
  }

  init() {
    this.slides = [
      {
        title: 'What is ProximaX Wallet?',
        description:
          `<br>&nbsp;<br>
          At ProximaX, we are committed to helping you secure your digital assets. All our wallet updates undergo rigorous testing in order to ensure that everything you hold in your wallet is safe. However, a large part of keeping your wallet  and its contents safe depends on YOU.`,
        isSmall: true,
        image: App.SLIDES.SLIDE1
      },
      {
        title: 'Securing Your Private Keys and Password',
        description:
          `<br>&nbsp;<br><strong>We strongly recommend you to:</strong>
          <br>
          
          <ul>
            <li>Write down your private keys and password and store them in a safe place.</li><br>
            <li>Do not store your keys and password on your computer or phone especially if they are assessible by other parties.</li>
          </ul>
          `,
        isSmall: true,
        image: App.SLIDES.SLIDE3
      },
      {
        title: 'Where are my digital tokens stored?',
        description:
          `Contrary to popular belief, your digital assets are never stored in a crypto wallet. All digital assets reside on the blockchain itself and ProximaX does not control your digital assets in any way.
          <br><br>
          <strong "padding-left: 10px;">IMPORTANT!</strong>
          <br>
          <ul>
            <li>Never reveal your private keys to anyone. </li><br>
            <li>We will never ask you for your private keys (and neither should anyone).
            </li><br>
            <li>We don’t give away free XPX.</li><br>
            <li>We will never ask you to send us XPX.</li>
          </ul>`,
        isSmall: true,
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'Why use cryptocurrency and blockchain?',
        description:
          `The purpose of cryptocurrency is to allow you to take full control and manage your digital tokens in an anonymous and secure way, from any location without relying on third parties.
          <br><br>
          The only information needed to do this is to have your public address and private keys. 
          `,
        isSmall: true,
        image: App.SLIDES.SLIDE4
      },
      // {
      //   title: 'What’s the upside?',
      //   description:
      //     `The purpose of cryptocurrency is to allow people to manage their funds in an anonymous and secure way, from any location without relying on third parties.

      //     <br> <br>

      //     On the blockchain, your funds are not controlled by any bank. You are the only one who has access to your funds and you can instantly transfer to any other address on the blockchain without depending on any authorizations, permissions or limits.
          
      //     <br> <br>

      //     Your public address and your private keys are the only pieces of information you need to hold to manage your funds from anywhere in the world.`,
      //   isSmall: true,
      //   image: App.SLIDES.SLIDE5
      // }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  gotoWelcome() {

    if(this.isPreview) {
      this.navCtrl.pop();
    } else {
      this.storage.set('isFirstAppOpen', false).then(_ => {
        this.navCtrl.setRoot(
          'RegisterPage',
          {},
          {
            animate: true,
            direction: 'forward'
          }
        );
      })
    }
   

  }

}
