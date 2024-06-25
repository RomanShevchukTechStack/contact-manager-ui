import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateContactPageComponent } from './create-contact-page/create-contact-page.component';
import { ContactsListPageComponent } from './contacts-list-page/contacts-list-page.component';

const routes: Routes = [
  { path: '', component: ContactsListPageComponent },
  { path: 'add', component: CreateContactPageComponent },
  { path: 'edit/:id', component: ContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
