import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TransactionListPage } from './transaction-list';
import { PipesModule } from './../../../../pipes/pipes.module';

import { ImportanceTransferTransactionComponent } from '../partials/importance-transfer-transaction/importance-transfer-transaction';
import { MosaicDefinitionTransactionComponent } from '../partials/mosaic-definition-transaction/mosaic-definition-transaction';
import { MosaicSupplyChangeTransactionComponent } from '../partials/mosaic-supply-change-transaction/mosaic-supply-change-transaction';
import { MultisigTransactionComponent } from '../partials/multisig-transaction/multisig-transaction';
import { ProvisionNamespaceTransactionComponent } from '../partials/provision-namespace-transaction/provision-namespace-transaction';
import { TransferTransactionComponent } from '../partials/transfer-transaction/transfer-transaction';
import { MultisigAggregateModificationTransactionComponent } from '../partials/multisig-aggregate-modification-transaction/multisig-aggregate-modification-transaction';

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
