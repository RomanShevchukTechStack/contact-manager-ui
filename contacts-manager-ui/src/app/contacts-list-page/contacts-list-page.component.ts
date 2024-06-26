import { Component } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { Contact, GetContactDTO } from '../shared/models/contact.model';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortAndPaginationDTO } from '../shared/DTOs/sortAndPagination.dto';

@Component({
  selector: 'app-contacts-list-page',
  templateUrl: './contacts-list-page.component.html',
  styleUrls: ['./contacts-list-page.component.css'],
  providers: [ContactService]
})

export class ContactsListPageComponent {
  public contacts: GetContactDTO[] = [];

  constructor(private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getContacts(null);
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).pipe(
      switchMap(() => this.contactService.getContacts(null)),
      tap(() => {
        this.toastr.success('Contact deleted successfully!', 'Success');
      }),
      catchError((error) => {
        this.toastr.error('Try again later', 'Something went wrong');
        return of([]);
      })
    ).subscribe((data: GetContactDTO[]) => {
      this.contacts = data;
    });
  }

  navigateToAdd() {
    this.router.navigateByUrl('/add');
  }

  navigateToEdit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  private getContacts(searchValues: SortAndPaginationDTO | null) {
    this.contactService.getContacts(searchValues).subscribe((data: GetContactDTO[]) => {
      this.contacts = data
    });
  }

  onSearch(searchValues: SortAndPaginationDTO) {
    console.log(searchValues);
  }

}
