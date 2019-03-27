import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionListPage } from './transaction-list';
import { SharedModule } from '../../../../app/shared.module';

@NgModule({
  declarations: [
    TransactionListPage
  ],
  entryComponents: [
  ],
  imports: [IonicPageModule.forChild(TransactionListPage), SharedModule]
})
export class TransactionListPageModule {}
