import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Device } from '@ionic-native/device';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

import { App } from '../providers/app/app';
import { ComponentsModule } from '../components/components.module';
import { AuthProvider } from '../providers/auth/auth';
import { NemProvider } from '../providers/nem/nem';
import { WalletProvider } from '../providers/wallet/wallet';
import { AlertProvider } from '../providers/alert/alert';
import { GetBalanceProvider } from '../providers/get-balance/get-balance';
import { UtilitiesProvider } from '../providers/utilities/utilities';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ToastProvider } from '../providers/toast/toast';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    StatusBar,
    SplashScreen,
    SecureStorage,
    Device,
    Clipboard,
    SocialSharing,

    App,
    AuthProvider,
    NemProvider,
    WalletProvider,
    AlertProvider,
    GetBalanceProvider,
    UtilitiesProvider,
    ToastProvider,
  ]
})
export class AppModule {}
