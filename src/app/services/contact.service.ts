import { Injectable } from '@angular/core';

import { Contact } from '../types/contact.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      description: 'A nice dude',
      email: 'johndoe@gmail.com',
      imagePath: 'https://reqres.in/img/faces/7-image.jpg',
      phoneNumber: '809-560-1234',
    },
  ];

  getContacts(): Contact[] {
    return [...this.contacts];
  }
}
