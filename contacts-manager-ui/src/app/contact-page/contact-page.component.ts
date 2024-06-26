import { Component, OnInit } from '@angular/core';
import { Contact, GetContactDTO } from '../shared/models/contact.model';
import { ContactService } from '../contacts/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';

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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      debugger;
      this.isNewContact = false;
      this.getContactDetails(contactId);
    }
  }

  handleAddorUpdateContact(contact: Contact) {
    if (this.isNewContact)
      this.addContact(contact);
    else
      this.updateContact(contact);

  }

  private addContact(contact: Contact) {
    this.contactService.addContact(contact)
      .pipe(
        tap(() => this.toastr.success('Contact added successfully!')),
        catchError(error => {
          this.toastr.error('Something went wrong: ' + error.message); 
          return [];
        })
      )
      .subscribe(() => this.navigateToBase());
  }

 private updateContact(contact: Contact) {
    this.contactService.updateContact(contact)
      .pipe(
        tap(() => this.toastr.success('Contact updated successfully!')),
        catchError(error => {
          this.toastr.error('Something went wrong: ' + error.message); 
          return [];
        })
      )
      .subscribe(() => this.navigateToBase());
  }

  private navigateToBase() {
    this.router.navigateByUrl('/');
  }

  private getContactDetails(contactId: string) {
    this.contactService.getContact(contactId)
      .subscribe((contact: Contact) => this.contact = contact);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
