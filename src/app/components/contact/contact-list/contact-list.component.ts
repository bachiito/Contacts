import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from 'src/app/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contactsSubscription!: Subscription;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactsSubscription = this.contactService.contactsSubject.subscribe(
      (contactData) => {
        this.contacts = contactData;
      }
    );
  }

  onAddNewContact(): void {
    this.router.navigate(['/new']);
  }

  onEditContact(index: number): void {
    this.router.navigate([`/edit/${index}`]);
  }

  onSaveContacts(): void {
    this.contactService.saveContacts();
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
