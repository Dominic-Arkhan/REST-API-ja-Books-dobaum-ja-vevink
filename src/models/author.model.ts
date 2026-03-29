export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  nationality: string;
  biography?: string;
  createdAt: string;
}

export type AuthorCreate = Omit<Author, 'id' | 'createdAt'>;
export type AuthorUpdate = Partial<AuthorCreate>;