import { Injectable } from '@angular/core';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      imagePath: 'https://reqres.in/img/faces/7-image.jpg',
      phoneNumbers: ['809-560-1234', '809-560-1234'],
    },
  ];

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
}
