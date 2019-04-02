import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionListPage } from './transaction-list';
import { SharedModule } from '../../../../app/shared.module';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    TransactionListPage
  ],
  entryComponents: [
  ],
  imports: [IonicPageModule.forChild(TransactionListPage), SharedModule, PipesModule]
})
export class TransactionListPageModule {}
