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
    isSmall?: boolean;
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  init() {
    this.slides = [
      {
        title: 'Performance',
        description:
          'NEM’s blockchain platform was designed and coded from the ground up for scale and speed. NEM’s permissioned private blockchain delivers industry-leading transaction rates for internal ledgers. And its revolutionary consensus mechanism and the Supernode program ensure that NEM’s open, public blockchain can grow without ever compromising throughput or stability.',
        isSmall: true,
        image: App.SLIDES.SLIDE4
      },
      {
        title: 'Ease of Development',
        description:
          'NEM’s blockchain exposes its functionality through a powerful API interface that can be used with any programming language, not a specific “smart contract” language. Existing business logic code can easily mate up and use blockchain where it’s strongest: secure transactions and ledger keeping. In short, configure NEM for your business, and then deploy blockchain incrementally and without forced retooling of existing infrastructure.',
        isSmall: true,
        image: App.SLIDES.SLIDE5
      },
      {
        title: 'Deep Customization',
        description:
          'Unlike other blockchain technologies, NEM is built from the ground up with powerful modular customization for virtually any application. We call it our Smart Asset system. With it, NEM lets you focus on building exactly what you need, whether that’s a fintech system, tracking logistics, an ICO, document notarization, decentralized authentication, or much more.',
        isSmall: true,
        image: App.SLIDES.SLIDE6
      },
      {
        title: 'Security',
        description:
          'NEM’s architecture provides an incredibly secure and stable platform through its use of Eigentrust++ and an incentivized public node network based on its two-tier architecture. The significant risks inherent in on-blockchain “smart contracts” are eliminated by providing building block customization to NEM functionality that keeps application security in your hands, not on the blockchain.',
        isSmall: true,
        image: App.SLIDES.SLIDE7
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  gotoWelcome() {
    this.navCtrl.setRoot(
      'WelcomePage',
      {},
      {
        animate: true,
        direction: 'forward'
      }
    );
  }
}
