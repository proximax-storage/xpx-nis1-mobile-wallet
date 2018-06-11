import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class App {

  private static BASE_URL = 'assets/imgs/stickers';
  public static STICKERS = {
    'SORRY': `${App.BASE_URL}/ninja-cry.png`,
    'HAPPY': `${App.BASE_URL}/ninja-happy.png`,
  };

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

}
