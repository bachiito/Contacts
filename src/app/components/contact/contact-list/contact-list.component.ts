import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from 'src/app/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    if (!this.contacts.length) {
      this.contactService.contactsEmitter.subscribe((contactsData) => {
        this.contacts = contactsData;
      });
    }
  }

  onAddNewContact(): void {
    this.router.navigate(['/new']);
  }

  onEditContact(index: number): void {
    this.router.navigate([`/edit/${index}`]);
  }
}
