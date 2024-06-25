import { Component } from '@angular/core';
import { Contact } from '../shared/models/contact.model';
import { ContactService } from '../contacts/contact.service';

@Component({
  selector: 'app-create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.css'],
  providers: [ContactService]
})
export class CreateContactPageComponent {


constructor(private contactService: ContactService) {}

  handleNewContact(contact: Contact) {
   this.contactService.addContact(contact).subscribe();
  }
}
