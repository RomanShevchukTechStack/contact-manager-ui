import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/models/contact.model';
import { ContactService } from '../contacts/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  providers: [ContactService]
})
export class ContactPageComponent implements OnInit {

  contact: Contact | null = null;
  isNewContact: boolean = true;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.isNewContact = false;
      this.contactService.getContact(contactId)
        .subscribe(contact => this.contact = contact);
    } 
  }

  ngOnInit() {
  }

  handleAddorUpdateContact(contact: Contact) {
    if (this.isNewContact) {
      this.contactService.addContact(contact).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    } else {
      this.contactService.updateContact(contact).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
