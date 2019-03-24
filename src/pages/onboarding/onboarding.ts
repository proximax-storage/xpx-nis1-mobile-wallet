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
    this.init();
    this.mockData.init(); // Uncomment to load mock data
  }

  init() {
    this.slides = [
      {
        title: 'What is ProximaX Wallet?',
        description:
          `ProximaX Wallet app is a free, client-side interface which allows you to interact directly with the blockchain while you remain in full control of your keys and funds.
          <br><br>
          Please think about this carefully. YOU are the only one who is in control. ProximaX is not a bank or exchange. We don’t hold your keys, your funds or your information. This means we can’t access accounts, recover keys, reset passwords or reverse transactions.`,
        isSmall: true,
        image: App.SLIDES.SLIDE1
      },
      {
        title: 'What if I lost my keys or password?',
        description:
          `Your tokens or coins are not in ProximaX Wallet app. Just like they’re not on your hardware wallet, on MetaMask or Blockchain Explorer. All funds are on the blockchain itself. This means that we do not control them. We are a doorway that allows you to interact with the blockchain in a convenient way.`,
        isSmall: true,
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'Where are my funds stored?',
        description:
          `We cannot recover your information for you. If you lose your information, it’s GONE FOREVER. ProximaX Wallet doesn’t store any data. After you’ve received your keys and set up password, we strongly suggest you:
          <br>
          <ul>
            <li>Write your keys or password down. Keep them safe.</li>
            <li>Do not store your keys and password on your computer or you phone.ea</li>
          </ul>`,
        isSmall: true,
        image: App.SLIDES.SLIDE3
      },
      {
        title: 'Some Helpful Tips',
        description:
          `<ul>
            <li><strong>Never give your private keys to anyone.</strong> <br>
            That includes your keystore file and mnemonic phrase.</li>
            <li><strong>Don’t trust any free XPX.</strong>  <br>
            If they’re giving away free XPX, it’s not real. If they email you saying they’re us, it’s not real. If they ask for your private key, it’s not real.</li>
            <li><strong>Feel free to contact us.</strong>  <br>
            Please feel free to contact us at info@proximax.io or join our official telegram group @ProximaXio</li>
          </ul>
          `,
        isSmall: true,
        image: App.SLIDES.SLIDE4
      },
      {
        title: 'What’s the upside?',
        description:
          `The purpose of cryptocurrency is to allow people to manage their funds in an anonymous and secure way, from any location without relying on third parties.

          <br> <br>

          On the blockchain, your funds are not controlled by any bank. You are the only one who has access to your funds and you can instantly transfer to any other address on the blockchain without depending on any authorizations, permissions or limits.
          
          <br> <br>

          Your public address and your private keys are the only pieces of information you need to hold to manage your funds from anywhere in the world.`,
        isSmall: true,
        image: App.SLIDES.SLIDE5
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  gotoWelcome() {
    this.storage.set('isFirstAppOpen', false).then(_ => {
      this.navCtrl.setRoot(
        'WelcomePage',
        {},
        {
          animate: true,
          direction: 'forward'
        }
      );
    })

  }
}
