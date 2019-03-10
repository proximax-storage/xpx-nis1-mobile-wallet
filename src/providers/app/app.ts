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
    NEM: `assets/imgs/mosaics/xem.png`,
    XPX: `assets/imgs/mosaics/xpx.png`,
    LYL: `assets/imgs/mosaics/lyl.png`
  };
  public static USER = `${App.ASSETS}/user.svg`;

  constructor(public http: HttpClient) {
    console.log("Hello AppProvider Provider");
  }
}
