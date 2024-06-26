import { Component } from '@angular/core';
import { ContactService } from '../contacts/contact.service';
import { Contact, GetContact } from '../shared/models/contact.model';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts-list-page',
  templateUrl: './contacts-list-page.component.html',
  styleUrls: ['./contacts-list-page.component.css'],
  providers: [ContactService]
})

export class ContactsListPageComponent {
  public contacts: GetContact[] = [];

  constructor(private contactService: ContactService,
    private router: Router, private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.contactService.getContacts().subscribe((data: GetContact[]) => {
      this.contacts = data
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).pipe(
      switchMap(() => this.contactService.getContacts())
    ).subscribe((data: GetContact[]) => {
      this.contacts = data;
      this.toastr.success('Hello world!', 'Toastr fun!');
    });
  }

  navigateToAdd() {
    this.router.navigateByUrl('/add');
  }

  navigateToEdit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

}
