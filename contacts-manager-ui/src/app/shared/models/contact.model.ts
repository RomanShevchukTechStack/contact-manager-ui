export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetContact extends Contact {
  id: string;
}