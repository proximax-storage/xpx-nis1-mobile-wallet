import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class App {
  private static ASSETS = "assets/imgs";
  public static STICKERS = {
    SORRY: `${App.ASSETS}/stickers/ninja-cry.png`,
    HAPPY: `${App.ASSETS}/stickers/ninja-happy.png`,
    LOOK: `${App.ASSETS}/stickers/ninja-look.png`,
    INFO: `${App.ASSETS}/stickers/ninja-info.png`,
    THUMBS_UP: `${App.ASSETS}/stickers/ninja-thumbs-up.png`
  };
  public static SLIDES = {
    SLIDE1: `${App.ASSETS}/slides/xpx-slide-1.png`,
    SLIDE2: `${App.ASSETS}/slides/xpx-slide-2.png`,
    SLIDE3: `${App.ASSETS}/slides/xpx-slide-3.png`,
    SLIDE4: `${App.ASSETS}/slides/xpx-slide-4.png`,
    SLIDE5: `${App.ASSETS}/slides/xpx-slide-5.png`
  };
  public static LOGO = {
    NEM: `https://nem.io/wp-content/uploads/2018/03/xpx-logo-Transparent-Border-.png`,
    XPX: `https://discourse-cdn-sjc1.com/business5/uploads/safenetwork/original/2X/3/32b90ee44d17ddf9dc89c661b00effdb46302a6e.png`,
    LYL: `https://s2.coinmarketcap.com/static/img/coins/200x200/2841.png`
  };
  public static USER = `${App.ASSETS}/user.svg`;

  constructor(public http: HttpClient) {
    console.log("Hello AppProvider Provider");
  }
}
