import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Contact } from "../shared/models/contact.model";


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact| null = null;
  @Output() newContact = new EventEmitter<Contact>();

  contactForm: FormGroup;

  constructor(private _fb: FormBuilder
  ) {
    this.contactForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.contactForm.valid) {
        const newContact: Contact = {
          firstName: this.contactForm.value.firstName,
          lastName: this.contactForm.value.lastName,
          email: this.contactForm.value.email,
          id: this.contact ?  this.contact.id : undefined
        };
        this.newContact.emit(newContact);
      }
    }
  }
}

