import { Injectable } from '@angular/core';
import { SecureStorage } from '@ionic-native/secure-storage';

import findIndex from 'lodash/findIndex';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(private secureStorage: SecureStorage) {
    console.log('Hello AuthProvider Provider');
  }

  getEmail() {
    return this.secureStorage.create('auth').then(storage => {
      return storage.get('selectedAccount').then(data => {
        const result = data ? JSON.parse(data) : { email: '' };
        return result.email;
      });
    });
  }

  getPassword() {
    return this.secureStorage.create('auth').then(storage => {
      return storage.get('selectedAccount').then(data => {
        const result = data ? JSON.parse(data) : { password: '' };
        return result.password;
      })
    });
  }

  setSelectedAccount(email: string, password: string) : Promise<any> {
    return this.secureStorage.create('auth').then(storage => {
      return storage.get('selectedAccount').then(data => {
        const accountFromInput = {
          email: email,
          password: password
        };
        return accountFromInput;
      }).then(account => {
        return storage.set('account', JSON.stringify(account));
      });
    })
  }

  /**
   * Login the user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  login(email: string, password: string): Promise<{ status: string, message: string }> {
    return this.secureStorage.create('auth').then(storage => {
      return storage.get('accounts').then(
        data => {
          const accountFromInput = {
            email: email,
            password: password
          };
          const ACCOUNTS = data ? JSON.parse(data) : [];


          let response: { status: string, message: string } = { status: '', message: '' };
          let accountExists = findIndex(ACCOUNTS, accountFromInput);

          console.log('login :: ACCOUNTS', ACCOUNTS);
          console.log('login :: accountFromInput', accountFromInput);
          console.log('login :: accountExists', accountExists);

          if (accountExists === -1) {
            response = {
              status: 'failed',
              message: "It looks like there's something wrong with your username of password you entered. Please try again."
            }
          } else {
            response = {
              status: 'success',
              message:
                "You've successfully logged in."
            };
          }

          return response;
        })
    });
  }

  /**
   * Check email if it is registered already.
   * @param email The email to check in secure storage.
   */
  checkAccountExistence(email): Promise<boolean> {
    return this.secureStorage.create('auth').then(storage => {
      let exists: boolean = false;
      return storage.get('accounts').then(data => {
        const ACCOUNTS = data ? JSON.parse(data) : [];

        if (findIndex(ACCOUNTS, email) === -1) {
          exists = true;
        }

        return exists;
      })
    });
  }

  /**
   * Register new user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  register(email: string, password: string) {
    return this.secureStorage.create('auth').then(storage => {
      storage.get('accounts')
        .then(data => {
          const ACCOUNTS = data ? JSON.parse(data) : [];

          console.log('login :: ACCOUNTS', ACCOUNTS);

          return ACCOUNTS;
        }).then((accounts: any[]) => {
          const accountFromInput = {
            email: email,
            password: password
          };
          accounts.push(accountFromInput);
          return storage.set('accounts', JSON.stringify(accounts));
        }).catch(err => {
          console.error('register :: error', err);

          let accounts = [];
          const accountFromInput = {
            email: email,
            password: password
          };
          accounts.push(accountFromInput);
          return storage.set('accounts', JSON.stringify(accounts)).then(res => {
            console.log('register :: res', res);
          });
        })
    });
  }

  /**
   * Removes the email and password of the logged in user.
   */
  remove(email: string) {
    return this.secureStorage.create('auth').then(storage => {
      storage.get('accounts').then(data => {
        const ACCOUNTS = data ? JSON.parse(data) : [];
        return ACCOUNTS;
      }).then((accounts: any[]) => {
        if (accounts) {
          const ACCOUNT_INDEX = findIndex(accounts, { email: email });
          accounts.splice(ACCOUNT_INDEX, 1);

          return storage.set('accounts', JSON.stringify(accounts));
        }
      });
    });
  }
}
