export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetContactDTO extends Contact {
  id: string;
}

export interface TableContactsDTO{
  contacts: GetContactDTO[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
}