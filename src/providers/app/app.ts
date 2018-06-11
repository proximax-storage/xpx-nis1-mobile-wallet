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
  };
  public static SLIDES = {
    'SLIDE1': `${App.BASE_URL}/slides/nem-slide-1.png`,
    'SLIDE2': `${App.BASE_URL}/slides/nem-slide-2.gif`,
    'SLIDE3': `${App.BASE_URL}/slides/nem-slide-3.png`,
  };

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

}
