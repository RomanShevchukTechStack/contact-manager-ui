import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact, GetContactDTO } from '../shared/models/contact.model';
import { ContactService } from '../shared/services/contact.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SortAndPaginationDTO } from '../shared/DTOs/sortAndPagination.dto';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() contacts: GetContactDTO[] = [];
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onSearch: EventEmitter<SortAndPaginationDTO> = new EventEmitter();

  searchControl: FormControl = new FormControl('');

  sortAndPaginationDTO: SortAndPaginationDTO = {
    orderBy: 'firstName',
    orderDirection: 'asc',
    pageNumber: 1,
    pageSize: 10
  };
  constructor(private contactService: ContactService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {

      this.sortAndPaginationDTO.searchValue = searchText;
      this.onSearch.emit(this.sortAndPaginationDTO);
    });
  }

  editContact(id: string) {
    this.onEdit.emit(id);
  }

  deleteContact(id: string) {
    this.onDelete.emit(id);
  }

}


