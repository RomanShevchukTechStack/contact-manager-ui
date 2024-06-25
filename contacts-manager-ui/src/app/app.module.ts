import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateContactPageComponent } from './create-contact-page/create-contact-page.component';
import { ContactService } from './contacts/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsListPageComponent } from './contacts-list-page/contacts-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    CreateContactPageComponent,
    ContactsListComponent,
    ContactsListPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  exports: [
    ContactFormComponent 
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
