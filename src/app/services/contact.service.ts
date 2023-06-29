import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private localStorageKey = 'contacts';
  contactsSubject = new Subject<Contact[]>();

  contacts: Contact[] =
    JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];

  constructor(private httpClient: HttpClient) {
    this.initService();
  }

  private initService(): void {
    if (!this.contacts.length) {
      this.loadContacts();
    }
  }

  private loadContacts(): void {
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
