export interface Book {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string;
  authorId: string;
  publisherId: string;
  genres: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookCreate = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type BookUpdate = Partial<BookCreate>;
