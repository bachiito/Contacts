import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private localStorageKey = 'contacts';
  contactsEmitter = new EventEmitter<Contact[]>();
  contacts: Contact[] =
    JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];

  constructor() {
    this.init();
  }

  private init(): void {
    if (!this.contacts.length) {
      this.loadContacts();
    }
  }

  private async loadContacts(): Promise<void> {
    const response = await fetch('/assets/data/contacts.json');
    this.contacts = await response.json();
    this.contactsEmitter.emit(this.contacts);
  }

  getContact(index: number): Contact {
    return [...this.contacts][index];
  }

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  editContact(index: number, contact: Contact): void {
    this.contacts[index] = contact;
  }

  saveContacts(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.contacts));
  }
}
