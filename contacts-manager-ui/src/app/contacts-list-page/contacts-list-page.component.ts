import { Component } from '@angular/core';
import { ContactService } from '../contacts/contact.service';
import { Contact, GetContact } from '../shared/models/contact.model';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list-page',
  templateUrl: './contacts-list-page.component.html',
  styleUrls: ['./contacts-list-page.component.css'],
  providers: [ContactService]
})

export class ContactsListPageComponent {
  public contacts: GetContact[] = [];

  constructor(private contactService: ContactService,
    private router: Router
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
    });
  }

  navigateToAdd() {
    this.router.navigateByUrl('/add'); 
  }

  navigateToEdit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`); 
  }

}
