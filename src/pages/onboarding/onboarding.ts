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
          `The ProximaX Wallet app is a free, client-side interface which allows you to interact directly with the blockchain while you remain in full control of your keys and funds. 
          <br><br>
          At ProximaX, we are committed to helping you secure your tokens and all our wallet updates
undergo vigorous testing in order to making sure that everything you hold in your wallet is safe.
However, a large part of keeping your wallet and its contents safe relies on YOU.`,
        isSmall: true,
        image: App.SLIDES.SLIDE1
      },
      {
        title: 'What if I lost my keys or password?',
        description:
          `When your private key is generated, it is known to only you. We have absolutely no access to it. We can’t access accounts, recover keys, reset passwords or reverse transactions for you. 
          <br><br>
          <strong>If you lose your private keys, it is GONE FOREVER. </strong>
          <br> <br>
          Once you have received your keys and set up your password, we strongly suggest you:
          <br>
          <ul>
            <li>Write your keys or password down. Keep them safe.</li><br>
            <li>Do not store your keys and password on your computer or you phone.ea</li>
          </ul>.
          `,
        isSmall: true,
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'Where are my funds stored?',
        description:
          `Contrary to popular belief, your tokens are never stored in a crypto wallet. All tokens  are on the blockchain itself and we do not control your tokens in any way.
          <br><br>
          <strong>Helpful Tips</strong>
          <br>
          <ul>
            <li>Never give your private keys to anyone. </li><br>
            <li>We will never ask you for your private key (and neither should anyone).
            </li><br>
            <li>We don’t give away free XPX.</li><br>
            <li>We will never ask you to send us XPX.</li>
          </ul>`,
        isSmall: true,
        image: App.SLIDES.SLIDE3
      },
      {
        title: 'Why use cryptocurrency and blockchain?',
        description:
          `The purpose of cryptocurrency is to allow people to manage their funds in an anonymous and secure way, from any location without relying on third parties.
          <br><br>
          On the blockchain, your funds are not controlled by any bank or any party. You are not bound to any authorizations, permissions or limits.
          <br><br>
          Your public address and your private keys are the only pieces of information you need to hold to manage your funds from anywhere in the world.
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
