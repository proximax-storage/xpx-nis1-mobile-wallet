import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionDetailPage } from './transaction-detail';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    TransactionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionDetailPage),
    PipesModule
  ],
})
export class TransactionDetailPageModule {}
