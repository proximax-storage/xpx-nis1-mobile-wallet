import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage } from '@ionic-native/secure-storage';
import { Device } from '@ionic-native/device';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

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
import { ContactsProvider } from '../providers/contacts/contacts';
import { BarcodeScannerProvider } from '../providers/barcode-scanner/barcode-scanner';
import { ListStorageProvider } from '../providers/list-storage/list-storage';
import { FilePickerProvider } from '../providers/file-picker/file-picker';
import { WalletBackupProvider } from '../providers/wallet-backup/wallet-backup';
import { CoingeckoProvider } from '../providers/coingecko/coingecko';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PipesModule
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
    BarcodeScanner,
    FileChooser,
    FilePath,
    File,

    App,
    AuthProvider,
    NemProvider,
    WalletProvider,
    AlertProvider,
    GetBalanceProvider,
    UtilitiesProvider,
    ToastProvider,
    ContactsProvider,
    BarcodeScannerProvider,
    ListStorageProvider,
    FilePickerProvider,
    WalletBackupProvider,
    CoingeckoProvider,
  ]
})
export class AppModule {}
