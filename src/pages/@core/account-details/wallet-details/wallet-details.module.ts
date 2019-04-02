import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletDetailsPage } from './wallet-details';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    WalletDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletDetailsPage), PipesModule
  ],
})
export class WalletDetailsPageModule {}
