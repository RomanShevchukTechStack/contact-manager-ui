import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsListPageComponent } from './contacts/contacts-list-page/contacts-list-page.component';
import { ContactPageComponent } from './contacts/contact-page/contact-page.component';


const routes: Routes = [
  { path: '', component: ContactsListPageComponent },
  { path: 'add', component: ContactPageComponent },
  { path: 'edit/:id', component: ContactPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
