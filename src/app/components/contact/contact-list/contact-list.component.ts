import { Component, OnInit } from '@angular/core';

import { Contact } from 'src/app/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onAddNewContact(): void {
    this.router.navigate(['../', 'new'], { relativeTo: this.route });
  }
}
