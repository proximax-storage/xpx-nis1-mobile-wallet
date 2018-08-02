import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TransactionListPage } from './transaction-list';
import { PipesModule } from './../../../../pipes/pipes.module';

import { ImportanceTransferTransactionComponent } from '../transaction-list-partials/importance-transfer-transaction/importance-transfer-transaction';
import { MosaicDefinitionTransactionComponent } from '../transaction-list-partials/mosaic-definition-transaction/mosaic-definition-transaction';
import { MosaicSupplyChangeTransactionComponent } from '../transaction-list-partials/mosaic-supply-change-transaction/mosaic-supply-change-transaction';
import { MultisigTransactionComponent } from '../transaction-list-partials/multisig-transaction/multisig-transaction';
import { ProvisionNamespaceTransactionComponent } from '../transaction-list-partials/provision-namespace-transaction/provision-namespace-transaction';
import { TransferTransactionComponent } from '../transaction-list-partials/transfer-transaction/transfer-transaction';
import { MultisigAggregateModificationTransactionComponent } from '../transaction-list-partials/multisig-aggregate-modification-transaction/multisig-aggregate-modification-transaction';

@NgModule({
  declarations: [
    TransactionListPage,
    ImportanceTransferTransactionComponent,
    MosaicDefinitionTransactionComponent,
    MosaicSupplyChangeTransactionComponent,
    MultisigTransactionComponent,
    ProvisionNamespaceTransactionComponent,
    TransferTransactionComponent,
    MultisigAggregateModificationTransactionComponent
  ],
  entryComponents: [
    ImportanceTransferTransactionComponent,
    MosaicDefinitionTransactionComponent,
    MosaicSupplyChangeTransactionComponent,
    MultisigTransactionComponent,
    ProvisionNamespaceTransactionComponent,
    TransferTransactionComponent,
    MultisigAggregateModificationTransactionComponent
  ],
  imports: [IonicPageModule.forChild(TransactionListPage), PipesModule]
})
export class TransactionListPageModule {}
