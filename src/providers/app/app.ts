import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class App {

  private static BASE_URL = 'assets/imgs/';
  public static STICKERS = {
    'SORRY': `${App.BASE_URL}/stickers/ninja-cry.png`,
    'HAPPY': `${App.BASE_URL}/stickers/ninja-happy.png`,
    'LOOK': `${App.BASE_URL}/stickers/ninja-look.png`,
  };
  public static SLIDES = {
    'SLIDE1': `${App.BASE_URL}/slides/nem-slide-1.png`,
    'SLIDE2': `${App.BASE_URL}/slides/nem-slide-2.gif`,
    'SLIDE3': `${App.BASE_URL}/slides/nem-slide-3.png`,
    'SLIDE4': `${App.BASE_URL}/slides/nem-slide-4.png`,
    'SLIDE5': `${App.BASE_URL}/slides/nem-slide-5.png`,
    'SLIDE6': `${App.BASE_URL}/slides/nem-slide-6.png`,
    'SLIDE7': `${App.BASE_URL}/slides/nem-slide-7.png`,
  };

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

}
