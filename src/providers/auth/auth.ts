import { Injectable } from '@angular/core';
import { SecureStorage } from '@ionic-native/secure-storage';

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

  getPassword() {
    return this.secureStorage.create('auth').then(storage => {
      return storage.get('password');
    });
  }

  /**
   * Login the user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  login(email: string, password: string) {
    return this.secureStorage.create('auth').then(storage => {
      return Promise.all([storage.get('email'), storage.get('password')]).then(
        data => {
          const loggedInAccount = {
            email: data[0],
            password: data[1]
          };

          if (
            // Incorrect email and correct password
            (loggedInAccount.email !== email &&
              loggedInAccount.password === password) ||
            // Incorrect password and correct email
            (loggedInAccount.email === email &&
              loggedInAccount.password !== password) ||
            // Incorrect password and incorrect email
            (loggedInAccount.email !== email &&
              loggedInAccount.password !== password)
          ) {
            return {
              status: 'failed',
              message:
                "It looks like there's something wrong with your username of password you entered. Please try again."
            };
          }

          return {
            status: 'success',
            message:
              "You've successfully logged in."
          };
        }
      );
    });
  }

  /**
   * Register new user.
   * @param email { string } The email of the user
   * @param password { string } The password of the user
   */
  register(email: string, password: string) {
    return this.secureStorage.create('auth').then(storage => {
      return Promise.all([
        storage.set('email', email),
        storage.set('password', password)
      ]);
    });
  }

  /**
   * Removes the email and password of the logged in user.
   */
  remove() {
    return this.secureStorage.create('auth').then(storage => {
      return Promise.all([storage.remove('email'), storage.remove('password')]);
    });
  }
}
