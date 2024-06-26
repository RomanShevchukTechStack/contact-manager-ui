export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetContactDTO extends Contact {
  id: string;
}