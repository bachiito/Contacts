import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsSubject = new Subject<Contact[]>();
  private localStorageKey = 'contacts';
  contacts: Contact[] =
    JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];

  constructor(private httpClient: HttpClient) {
    this.loadContacts();
  }

  loadContacts(): void {
    if (this.contacts.length) return;

    this.httpClient
      .get<Contact[]>('/assets/data/contacts.json')
      .subscribe((contactsData) => {
        this.contacts = contactsData;
        this.contactsSubject.next(this.contacts);
      });
  }

  getContact(index: number): Contact {
    return [...this.contacts][index];
  }

  getContacts(): Subject<Contact[]> {
    return this.contactsSubject;
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
