// contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../shared/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:8088/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getContact(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addContact(contact: Contact): Observable<any> {
    debugger;
    return this.http.post<Contact>(this.apiUrl, contact)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateContact(contact: Contact): Observable<any> {
    const url = `${this.apiUrl}/${contact.id}`;
    return this.http.put<any>(url, contact)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteContact(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }
}
