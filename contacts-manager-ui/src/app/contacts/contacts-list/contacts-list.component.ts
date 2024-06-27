import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SortAndPaginationDTO } from 'src/app/shared/DTOs/sortAndPagination.dto';
import { SortDirection } from 'src/app/shared/enums/sortDirestion.enum';
import { TableContactsDTO } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {
  @Input() TableContactsDTO!: TableContactsDTO;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onSearch: EventEmitter<SortAndPaginationDTO> = new EventEmitter();

  searchControl: FormControl = new FormControl('');

  sortAndPaginationDTO: SortAndPaginationDTO = {
    orderBy: 'id',
    orderDirection: SortDirection.Ascending,
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

  onPageChange(pageNumber: number) {
    this.sortAndPaginationDTO.pageNumber = pageNumber;
    this.onSearch.emit(this.sortAndPaginationDTO);
  }

  onSortChange(column: string) {
    if (this.sortAndPaginationDTO.orderBy === column) {
      this.sortAndPaginationDTO.orderDirection = this.sortAndPaginationDTO.orderDirection == SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
    } else {
      this.sortAndPaginationDTO.orderBy = column;
      this.sortAndPaginationDTO.orderDirection = SortDirection.Ascending;
    }

    this.onSearch.emit(this.sortAndPaginationDTO);
  }

  goToPage(pageNumber: number) {
    this.sortAndPaginationDTO.pageNumber = pageNumber
    this.onSearch.emit(this.sortAndPaginationDTO);
  }

  getPagesArary() {
    return Array.from({ length: this.TableContactsDTO.totalPages }, (_, index) => index + 1)
  }

}


