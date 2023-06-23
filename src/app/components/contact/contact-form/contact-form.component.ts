import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/types/contact.type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  private emailRegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  private phoneRegExp =
    /^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  editMode = false;
  contactId!: number;
  contactForm!: FormGroup;
  contactNumbers = new FormArray<FormControl<string | null>>([
    this.formBuilder.control(null, [
      Validators.required,
      Validators.pattern(this.phoneRegExp),
    ]),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];

    if (idParam) {
      this.contactId = idParam;
      this.editMode = true;
    }

    this.contactForm = this.initForm();
  }

  private initForm(): FormGroup {
    let editingContact!: Contact;
    let [firstName, lastName, email, imagePath] = ['', '', '', ''];

    if (this.editMode) {
      editingContact = this.contactService.getContact(this.contactId);
      ({ firstName, lastName, email, imagePath } = editingContact);
      this.contactNumbers.clear();
    }

    if (editingContact?.phoneNumbers?.length) {
      editingContact.phoneNumbers.forEach((num) => {
        this.contactNumbers.push(
          this.formBuilder.control(num, [
            Validators.required,
            Validators.pattern(this.phoneRegExp),
          ])
        );
      });
    }

    return this.formBuilder.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      email: [email, Validators.pattern(this.emailRegExp)],
      imagePath: [imagePath],
      phoneNumbers: this.contactNumbers,
    });
  }

  onAddPhoneNumber(): void {
    this.contactNumbers.push(
      this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern(this.phoneRegExp),
      ])
    );
  }

  onRemovePhoneNumber(index: number): void {
    this.contactNumbers.removeAt(index);
  }

  onSubmit(): void {
    this.contactService.addContact(this.contactForm.value);
    this.onGoBack();
  }

  onEditContact(): void {
    this.contactService.editContact(this.contactId, this.contactForm.value);
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
