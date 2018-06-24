import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Device } from '@ionic-native/device';

import { App } from '../providers/app/app';
import { ComponentsModule } from './../components/components.module';
import { AuthProvider } from '../providers/auth/auth';
import { VerificationCodeProvider } from '../providers/verification-code/verification-code';
import { HttpModule } from '@angular/http';

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
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SecureStorage,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    App,
    AuthProvider,
    VerificationCodeProvider
  ]
})
export class AppModule {}
