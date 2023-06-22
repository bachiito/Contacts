import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  contactNumbers = new FormArray<FormControl<string | null>>([]);

  private emailRegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  private phoneRegExp =
    /^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.pattern(this.emailRegExp)],
      imagePath: [null],
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
    this.contactForm.reset();
  }
}
