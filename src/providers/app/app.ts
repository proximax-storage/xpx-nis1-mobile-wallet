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
    HAPPY: `${App.ASSETS}/stickers/happy.png`,
    INFO: `${App.ASSETS}/stickers/info.png`,
    SORRY: `${App.ASSETS}/stickers/sorry.png`,
    LOOK: `${App.ASSETS}/stickers/look.png`,
    HINT: `${App.ASSETS}/stickers/idea.png`,
    WALLET: `${App.ASSETS}/stickers/wallet.png`,
    INVALID: `${App.ASSETS}/stickers/invalid.png`
  };
  public static SLIDES = {
    SLIDE1: `${App.ASSETS}/slides/xpx-slide-1.png`,
    SLIDE2: `${App.ASSETS}/slides/xpx-slide-2.png`,
    SLIDE3: `${App.ASSETS}/slides/xpx-slide-3.png`,
    SLIDE4: `${App.ASSETS}/slides/xpx-slide-4.png`,
    SLIDE5: `${App.ASSETS}/slides/xpx-slide-5.png`,
    SLIDE6: `${App.ASSETS}/slides/xpx-slide-5.png`
  };
  public static LOGO = {
    XPX: `assets/imgs/mosaics/xpx.png`,
    NEM: `assets/imgs/mosaics/xem.png`,
    NPXS: `assets/imgs/mosaics/npxs.png`,
    SFT: `assets/imgs/mosaics/sft.png`,
    XAR: `assets/imgs/mosaics/xar.png`,
    DEFAULT: `assets/imgs/mosaics/default.png`,
  };
  public static USER = `${App.ASSETS}/user.svg`;

  constructor(public http: HttpClient) {
    console.log("Hello AppProvider Provider");
  }
}
