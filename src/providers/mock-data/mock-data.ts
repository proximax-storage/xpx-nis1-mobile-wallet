import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MockDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockDataProvider {

  pin: string;
  accounts: Array<{ email: string, password: string }>;
  wallets: any;
  selectedAccount: { email: string, password: string };
  selectedWallet: any;

  constructor(private storage: Storage) {
    console.log('Hello MockDataProvider Provider');
  }

  private initData() {
    this.pin = '';

    this.accounts = [
      {
        email: 'ninja@nem.io',
        password: '123qweasd'
      }
    ];

    this.wallets = {
      'ninja@nem.io': [
        'eyJuYW1lIjoiVGVzdCB3YWxsZXQiLCJuZXR3b3JrIjoiMTA0IiwiYWRkcmVzcyI6Ik5CRFVMT0VIRVhaUVFLSFZITFVPTk81NlJKREZCNTNQSlJUWEtXMzUiLCJjcmVhdGlvbkRhdGUiOiIyMDE4LTA4LTEyVDIwOjQ0OjE2Ljk4NiIsInNjaGVtYSI6MSwidHlwZSI6InNpbXBsZSIsImVuY3J5cHRlZFByaXZhdGVLZXkiOiJiY2Q1NWY4NTJmNmJmNGNmYTJhMzFlMGQ1MzQwM2IyZDk4NDc3NDQ0NTM0NDNhODUyYmRmZDM4ZTVmY2E4MWZjMjgwMDM3NWVmNWVjYTAyNWUyYzBjMjQ1ZjkyZTliM2QiLCJpdiI6ImJlZjhlMGIyNjEzYTE3YjRhYzMxYWNjZWNkMzNmOWI5In0='
      ]
    };

    this.selectedAccount = {
      email: 'ninja@nem.io',
      password: '123qweasd'
    };

    this.selectedWallet = {
      'ninja@nem.io': 'eyJuYW1lIjoiVGVzdCB3YWxsZXQiLCJuZXR3b3JrIjoiMTA0IiwiYWRkcmVzcyI6Ik5CRFVMT0VIRVhaUVFLSFZITFVPTk81NlJKREZCNTNQSlJUWEtXMzUiLCJjcmVhdGlvbkRhdGUiOiIyMDE4LTA4LTEyVDIwOjQ0OjE2Ljk4NiIsInNjaGVtYSI6MSwidHlwZSI6InNpbXBsZSIsImVuY3J5cHRlZFByaXZhdGVLZXkiOiJiY2Q1NWY4NTJmNmJmNGNmYTJhMzFlMGQ1MzQwM2IyZDk4NDc3NDQ0NTM0NDNhODUyYmRmZDM4ZTVmY2E4MWZjMjgwMDM3NWVmNWVjYTAyNWUyYzBjMjQ1ZjkyZTliM2QiLCJpdiI6ImJlZjhlMGIyNjEzYTE3YjRhYzMxYWNjZWNkMzNmOWI5In0='
    };
  }

  init() {
    this.initData();

    Promise.all([
      this.storage.get('pin'),
      this.storage.get('wallets'),
      this.storage.get('accounts'),
      this.storage.get('selectedWallet'),
      this.storage.get('selectedAccount'),
    ]).then(results => {

      const PIN = results[0];
      const ACCOUNTS = results[1];
      const WALLETS = results[2];
      const SELECTED_ACCOUNT = results[3];
      const SELECTED_WALLET = results[4];

      if (!PIN) this.storage.set('pin', this.pin);
      if (!ACCOUNTS) this.storage.set('accounts', this.accounts);
      if (!WALLETS) this.storage.set('wallets', this.wallets);
      if (!SELECTED_ACCOUNT) this.storage.set('selectedAccount', this.selectedAccount);
      if (!SELECTED_WALLET) this.storage.set('selectedWallet', this.selectedWallet);
    });
  }
}
