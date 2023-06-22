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

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);

    console.log(this.contacts);
  }
}
