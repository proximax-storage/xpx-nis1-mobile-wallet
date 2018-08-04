//type: 8193

import { Component, Input } from '@angular/core';
import { App } from '../../../../../providers/app/app';

@Component({
  selector: 'provision-namespace-detail',
  templateUrl: 'provision-namespace-detail.html'
})
export class ProvisionNamespaceDetailComponent {
  @Input() tx: any;
  App = App;
}
