import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DateTime } from 'luxon';
import { Base64 } from 'js-base64';
import { SimpleWallet, NetworkTypes } from 'nem-library';

import { findIndex } from 'lodash';

/*
 Generated class for the NemProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class WalletProvider {
  wallets: SimpleWallet[];

  constructor(private storage: Storage) {}

  /**
   * Store wallet
   * @param wallet
   * @return Promise with stored wallet
   */
  public storeWallet(wallet: SimpleWallet): Promise<SimpleWallet> {
    let result = [];
    return this.getWallets().then(value => {
      result = value;
      result.push(wallet);
      result = result.map(_ => _.writeWLTFile());
      this.storage.set('wallets', JSON.stringify(result));
      return wallet;
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
  public updateWalletName(wallet, newWalletName) {
    return this.getWallets().then(wallets => {
      let result : any = wallets;

      const walletIndex = findIndex(result, wallet);

      let selectedWallet : any = result[walletIndex];
      selectedWallet.name = newWalletName;

      result = result.map(_ => _.writeWLTFile());

      return this.storage.set('wallets', JSON.stringify(result)).then(value => {
        return selectedWallet;
      });
    });
  }

  deleteWallet(wallet) {
    return this.getWallets().then(wallets => {
      let result : any = wallets;

      const walletIndex = findIndex(result, wallet);
      result.splice(walletIndex, 1);

      result = result.map(_ => _.writeWLTFile());

      return this.storage.set('wallets', JSON.stringify(result));
    });
  }

  /**
   * Check If Wallet Name Exists
   * @param walletName
   * @return Promise that resolves a boolean if exists
   */
  public checkIfWalletNameExists(walletName): Promise<boolean> {
    let exists = false;

    return this.getWallets().then(value => {
      let wallets = value || [];
      for (var i = 0; i < wallets.length; i++) {
        if (wallets[i].name == walletName) {
          exists = true;
          break;
        }
      }
      return exists;
    });
  }

  /**
   * Retrieves selected wallet
   * @return promise with selected wallet
   */
  public getSelectedWallet(): Promise<SimpleWallet> {
    return this.storage.get('selectedWallet').then(data => {
      let result = null;
      if (data) {
        result = SimpleWallet.readFromWLT(JSON.parse(data));
      }
      return result;
    });
  }

  /**
   * Get loaded wallets from localStorage
   */
  public getWallets(): Promise<SimpleWallet[]> {
    return this.storage.get('wallets').then(data => {
      let result = [];
      if (data) {
        result = JSON.parse(data).map(walletFile => {
          if (walletFile.name) {
            return this.convertJSONWalletToFileWallet(walletFile);
          } else {
            return SimpleWallet.readFromWLT(walletFile);
          }
        });
      }
      return result;
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
    return this.storage.set(
      'selectedWallet',
      JSON.stringify(wallet.writeWLTFile())
    );
  }

  /**
   * Remove selected Wallet
   */
  public unsetSelectedWallet() {
    this.storage.set('selectedWallet', null);
  }
}
