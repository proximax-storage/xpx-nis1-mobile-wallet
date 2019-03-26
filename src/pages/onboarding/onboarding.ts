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
          `The ProximaX Wallet app is a free, client-side interface which allows you to interact directly with
          the blockchain while you remain in full control of your keys and funds.
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
          `When you first launch the ProximaX Wallet app, it creates a private key for you. A private key is a
          string of alpha-numeric characters that allows you to access the tokens you hold that are stored on
          the blockchain via the ProximaX Wallet.
          <br><br>
          The role of the private key is to give the holder of the key unrestricted access to the tokens it
represents on this wallet. This private key can be used to restore the contents of your wallet in the
event that your phone is stolen, lost or does not work anymore.
          `,
        isSmall: true,
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'Where are my funds stored?',
        description:
          `All tokens actually reside on the blockchain itself and the wallet is merely a doorway that allows you to
          interact with the blockchain in a convenient way. Therefore, we do not control your tokens in any
          way.
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
