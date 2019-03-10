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
        title: 'BLOCKCHAIN',
        description:
          'Provided for via the NEM technology, ProximaX now extends corporations and enterprises with the choice of a public and private blockchain.',
        isSmall: true,
        image: App.SLIDES.SLIDE1
      },
      {
        title: 'STREAMING',
        description:
          'Leveraging from the well-developed peer-to-peer streaming protocol running on blockchain by PeerStream Inc, your enterprise system will be assured of privacy when communication takes place outside of the chain especially when in contact with crypto identities.',
        isSmall: true,
        image: App.SLIDES.SLIDE2
      },
      {
        title: 'STORAGE',
        description:
          'Your data will never be lost because of ProximaX’s built-in automatic data replication and distribution capability.',
        isSmall: true,
        image: App.SLIDES.SLIDE3
      },
      {
        title: 'CONSENSUS',
        description:
          'ProximaX will use multi-layered consensus protocols for voting, governance, harvesting and to reward network nodes for contributing storage and bandwidth resources on the network. ProximaX nodes, app developers, and content creators will be rewarded in XPX tokens based on their various business models on the platform.',
        isSmall: true,
        image: App.SLIDES.SLIDE4
      },
      {
        title: 'DATABASE SYSTEM',
        description:
          'Decentralised Database Technology features a high throughput, low latency, and immutable data storage including all the blockchain attributes that allow developers to build secure applications with powerful indexing and querying functionality using the underlying MongoDB database engine.',
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
