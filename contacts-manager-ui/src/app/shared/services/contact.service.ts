// contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { SortAndPaginationDTO } from '../DTOs/sortAndPagination.dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:8088/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(searchValues: SortAndPaginationDTO | null): Observable<any> {
    let params = new HttpParams();
    if (searchValues) {
      if (searchValues.searchValue) {
        params = params.set('search', searchValues.searchValue);
      }
      if (searchValues.orderBy) {
        params = params.set('orderBy', searchValues.orderBy);
      }
      if (searchValues.orderDirection) {
        params = params.set('orderDirection', searchValues.orderDirection);
      }
      if (searchValues.pageNumber) {
        params = params.set('pageNumber', searchValues.pageNumber.toString());
      }
      if (searchValues.pageSize) {
        params = params.set('pageSize', searchValues.pageSize.toString());
      }
    }

    return this.http.get<any[]>(this.apiUrl, { params })
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
