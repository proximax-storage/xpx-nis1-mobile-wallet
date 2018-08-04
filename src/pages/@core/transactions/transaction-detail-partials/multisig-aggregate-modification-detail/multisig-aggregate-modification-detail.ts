//"type": 4700

import { Component, Input } from '@angular/core';
import { App } from '../../../../../providers/app/app';

@Component({
  selector: 'multisig-aggregate-modification-detail',
  templateUrl: 'multisig-aggregate-modification-detail.html'
})
export class MultisigAggregateModificationDetailComponent {
  @Input() tx: any;
  App = App;
}
