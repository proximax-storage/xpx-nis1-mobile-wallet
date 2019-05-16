import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilitiesProvider } from '../../../../providers/utilities/utilities';

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  languages: Array<any> = [
    {value: 'en', name: 'English', icon:'en'},
    {value: 'cn', name: 'Chinese (Simplified)', icon:'en'},
    {value: 'es', name: 'Spanish', icon:'en'},
    {value: 'fr', name: 'French', icon:'en'},
    {value: 'jp', name: 'Japanese', icon:'en'},
    {value: 'nl', name: 'Dutch', icon:'en'},
    {value: 'ru', name: 'Russian', icon:'en'},
  ]

  selectedLanguage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public utils: UtilitiesProvider,

    ) {
			console.log("LOG: LanguagePage -> this.navParams.data", this.navParams.data);
      this.selectedLanguage = this.navParams.data.selectedLanguage

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSelect(lang) {
  this.selectedLanguage = lang.value
  this.viewCtrl.dismiss(lang);
  }
  

}
