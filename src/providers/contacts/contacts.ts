import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as uniqid from 'uniqid';
import findIndex from 'lodash/findIndex';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsProvider {
  constructor(private storage: Storage) {
    console.log('Hello CrudProvider Provider');
  }

  private doesContactExist(contact) {
    return this.getAll().then(contacts => {
      const CONTACT_INDEX = findIndex(contacts, contact);
      let result = false;

      if (CONTACT_INDEX >= 0 && contacts.length >= 0) {
        result = true;
      }

      return result;
    });
  }

  getAll() {
    return this.storage.get('contacts').then(contacts => {
      return contacts || [];
    });
  }

  push(contact) {
    return this.doesContactExist(contact).then(doesContactExist => {
      return this.getAll().then(contacts => {
        contacts.push({ id: uniqid.time(), ...contact });

        return this.storage.set('contacts', contacts);
      });
    });
  }

  update(id, contact) {
    return this.doesContactExist(contact).then(doesContactExist => {
      if (doesContactExist) {
        alert('Nothing is changed. Please try again.');
      } else {
        return this.getAll().then(contacts => {
          const CONTACT_INDEX = findIndex(contacts, { id: id });
          contacts[CONTACT_INDEX] = contact;

          return this.storage.set('contacts', contacts);
        });
      }
    });
  }

  remove(id) {
    return this.getAll().then(contacts => {
      const CONTACT_INDEX = findIndex(contacts, { id: id });
      contacts.splice(CONTACT_INDEX, 1);

      return this.storage.set('contacts', contacts);
    });
  }
}
