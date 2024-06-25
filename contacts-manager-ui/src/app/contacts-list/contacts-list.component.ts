import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, GetContact } from '../shared/models/contact.model';
import { ContactService } from '../contacts/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() contacts: GetContact[] = [];
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  
  constructor(private contactService: ContactService) { }
  
  editContact(contact: Contact) {

  }
  
  deleteContact(id: string) {
   this.onDelete.emit(id);
  }
}


