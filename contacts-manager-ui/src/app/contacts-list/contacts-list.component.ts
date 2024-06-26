import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, GetContactDTO } from '../shared/models/contact.model';
import { ContactService } from '../contacts/contact.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() contacts: GetContactDTO[] = [];
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  searchControl: FormControl = new FormControl('');
  
  constructor(private contactService: ContactService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // wait for the user to stop typing for 300ms
      distinctUntilChanged() // only emit if the value has changed
    ).subscribe(searchText => {
      console.log(searchText);
    });
   }

  editContact(id: string) {
    this.onEdit.emit(id);
  }

  deleteContact(id: string) {
    this.onDelete.emit(id);
  }

  onSearchPerform(searchValue: string) {
    
  }
}


