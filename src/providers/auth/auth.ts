import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import findIndex from 'lodash/findIndex';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  getEmail() {
    return this.storage.get('selectedAccount').then(data => {
      const result = data ? data : { email: '' };
      return result.email;
    });
  }

  getPassword() {
    return this.storage.get('selectedAccount').then(data => {
      const result = data ? data : { password: '' };
      return result.password;
    });
  }

  setSelectedAccount(email: string, password: string): Promise<any> {
    const accountFromInput = {
      email: email,
      password: password
    };

    return this.storage.set('isLoggedIn', true)
      .then(_ => {
        return this.storage.get('selectedAccount');
      })
      .then(_ => {
        return accountFromInput;
      })
      .then(_ => {
        return this.storage.set('selectedAccount', accountFromInput);
      });
  }

  /**
   * Login the user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  login(
    email: string,
    password: string
  ): Promise<{ status: string; message: string }> {
    return this.storage.get('accounts').then(data => {
      const accountFromInput = {
        email: email,
        password: password
      };
      const ACCOUNTS = data ? data : [];

      let response: { status: string; message: string } = {
        status: '',
        message: ''
      };
      let accountExists = findIndex(ACCOUNTS, accountFromInput);

      if (accountExists === -1) {
        response = {
          status: 'failed',
          message:
            "It looks like there's something wrong with your username of password you entered. Please try again."
        };
      } else {
        response = {
          status: 'success',
          message: "You've successfully logged in."
        };
      }

      return response;
    });
  }

  /**
   * Check email if it is registered already.
   * @param email The email to check in secure storage.
   */
  checkAccountExistence(email): Promise<boolean> {
    let exists: boolean = false;
    return this.storage.get('accounts').then(data => {
      const ACCOUNTS = data ? data : [];

      if (findIndex(ACCOUNTS, email) === -1) {
        exists = true;
      }

      return exists;
    });
  }

  /**
   * Register new user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  register(email: string, password: string) {
    return this.storage
      .get('accounts')
      .then(data => {
        const ACCOUNTS = data ? data : [];

        return ACCOUNTS;
      })
      .then((accounts: any[]) => {
        const accountFromInput = {
          email: email,
          password: password
        };
        accounts.push(accountFromInput);
        return this.storage.set('accounts', accounts);
      });
  }

  /**
   * Removes the email and password of the logged in user.
   */
  remove(email: string) {
    return this.storage
      .get('accounts')
      .then(data => {
        const ACCOUNTS = data ? data : [];
        return ACCOUNTS;
      })
      .then((accounts: any[]) => {
        if (accounts) {
          const ACCOUNT_INDEX = findIndex(accounts, { email: email });
          accounts.splice(ACCOUNT_INDEX, 1);

          return this.storage.set('accounts', accounts);
        }
      });
  }

  /**
   * Log out account delete any related data to it.
   */
  logout(): Promise<any> {
    return this.storage.set('isLoggedIn', false).then(_ => {
      this.storage.set('selectedAccount', {})
    });
  }
}
