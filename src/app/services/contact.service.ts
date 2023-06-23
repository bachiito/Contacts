import { Injectable } from '@angular/core';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private localStorageKey = 'contacts';
  contacts: Contact[] =
    JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];

  getContact(index: number): Contact {
    return [...this.contacts][index];
  }

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.updateLocalStorage();
  }

  editContact(index: number, contact: Contact): void {
    this.contacts[index] = contact;
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.contacts));
  }
}
