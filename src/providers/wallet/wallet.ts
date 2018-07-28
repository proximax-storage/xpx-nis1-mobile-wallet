import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DateTime } from 'luxon';
import { Base64 } from 'js-base64';
import { SimpleWallet, NetworkTypes } from 'nem-library';

import { findIndex } from 'lodash';

import { AuthProvider } from '../auth/auth';

/*
 Generated class for the NemProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class WalletProvider {
  wallets: SimpleWallet[];

  constructor(private storage: Storage, private authProvider: AuthProvider) {}

  /**
   * Store wallet
   * @param wallet
   * @return Promise with stored wallet
   */
  public storeWallet(wallet: SimpleWallet): Promise<SimpleWallet> {
    let result = [];
    return this.authProvider.getEmail().then(email => {
      return this.getAccounts().then(value => {
        let accounts = value;

        result = accounts[email];
        result.push(wallet);
        result = result.map(_ => _.writeWLTFile());

        accounts[email] = result;

        this.storage.set('wallets', accounts);
        return wallet;
      });
    });
  }

  // =======
  // Wallets
  // =======

  /**
   * Update the wallet name of the given wallet.
   * @param wallet The wallet to change the name.
   * @param newWalletName The new name for the wallet.
   */
  public updateWalletName(wallet: SimpleWallet, newWalletName: string) {
    return this.authProvider.getEmail().then(email => {
      return this.getAccounts().then(value => {
        let result: any = value[email];

        const walletIndex = findIndex(result, wallet);

        let selectedWallet: any = result[walletIndex];
        selectedWallet.name = newWalletName;

        result = result.map(_ => _.writeWLTFile());

        let ACCOUNT = {};
        ACCOUNT[email] = result;

        return this.storage.set('wallets', ACCOUNT).then(value => {
          return selectedWallet;
        });
      });
    });
  }

  deleteWallet(wallet: SimpleWallet) {
    return this.authProvider.getEmail().then(email => {
      return this.getAccounts().then(value => {
        let result: any = value[email];

        const walletIndex = findIndex(result, wallet);
        result.splice(walletIndex, 1);

        result = result.map(_ => _.writeWLTFile());

        let ACCOUNT = {};
        ACCOUNT[email] = result;

        return this.storage.set('wallets', ACCOUNT);
      });
    });
  }

  /**
   * Check If Wallet Name Exists
   * @param walletName
   * @return Promise that resolves a boolean if exists
   */
  public checkIfWalletNameExists(walletName: string): Promise<boolean> {
    let exists = false;

    return this.authProvider.getEmail().then(email => {
      return this.getAccounts().then(value => {
        let wallets = value[email];
        for (var i = 0; i < wallets.length; i++) {
          if (wallets[i].name == walletName) {
            exists = true;
            break;
          }
        }
        return exists;
      });
    });
  }

  /**
   * Retrieves selected wallet
   * @return promise with selected wallet
   */
  public getSelectedWallet(): Promise<SimpleWallet> {
    return this.authProvider.getEmail().then(email => {
      return this.storage.get('selectedWallet').then(data => {
        let result = null;
        const ACCOUNT = data[email];

        if (data) {
          result = SimpleWallet.readFromWLT(ACCOUNT);
        } else {
          result = {};
        }

        return result;
      });
    });
  }

  /**
   * Get loaded wallets from localStorage
   */
  public getAccounts(): Promise<any> {
    return this.authProvider.getEmail().then(email => {
      return this.storage.get('wallets').then(data => {
        let ACCOUNT = data ? data : {};
        const ACCOUNT_WALLETS = ACCOUNT[email] ? ACCOUNT[email] : [];

        if (data) {
          const wallets = ACCOUNT_WALLETS.map(walletFile => {
            if (walletFile.name) {
              return this.convertJSONWalletToFileWallet(walletFile);
            } else {
              return SimpleWallet.readFromWLT(walletFile);
            }
          });

          ACCOUNT[email] = wallets;
        } else {
          ACCOUNT[email] = [];
        }

        return ACCOUNT;
      });
    });
  }

  /**
   * Get loaded wallets from localStorage
   */
  public getWallets(): Promise<any> {
    return this.authProvider.getEmail().then(email => {
      return this.storage.get('wallets').then(data => {
        let ACCOUNT = data ? data : {};
        const ACCOUNT_WALLETS = ACCOUNT[email] ? ACCOUNT[email] : [];

        if (data) {
          const wallets = ACCOUNT_WALLETS.map(walletFile => {
            if (walletFile.name) {
              return this.convertJSONWalletToFileWallet(walletFile);
            } else {
              return SimpleWallet.readFromWLT(walletFile);
            }
          });

          ACCOUNT[email] = wallets;
        } else {
          ACCOUNT[email] = [];
        }

        return ACCOUNT[email];
      });
    });
  }

  private convertJSONWalletToFileWallet(wallet): SimpleWallet {
    let walletString = Base64.encode(
      JSON.stringify({
        address: wallet.accounts[0].address,
        creationDate: DateTime.local().toString(),
        encryptedPrivateKey: wallet.accounts[0].encrypted,
        iv: wallet.accounts[0].iv,
        network:
          wallet.accounts[0].network == -104
            ? NetworkTypes.TEST_NET
            : NetworkTypes.MAIN_NET,
        name: wallet.name,
        type: 'simple',
        schema: 1
      })
    );
    return SimpleWallet.readFromWLT(walletString);
  }

  /**
   * Set a selected wallet
   */
  public setSelectedWallet(wallet: SimpleWallet) {
    return Promise.all([
      this.authProvider.getEmail(),
      this.storage.get('selectedWallet')
    ]).then(results => {
      const EMAIL = results[0];
      const SELECTED_WALLET = results[1] ? results[1] : {};

      SELECTED_WALLET[EMAIL] = wallet.writeWLTFile();

      return this.storage.set('selectedWallet', SELECTED_WALLET);
    });
  }

  /**
   * Remove selected Wallet
   */
  public unsetSelectedWallet() {
    return this.authProvider.getEmail().then(email => {
      this.storage.get('selectedWallet').then(selectedWallet => {
        delete selectedWallet[email];

        this.storage.set('selectedWallet', selectedWallet);
      });
    });
  }
}
