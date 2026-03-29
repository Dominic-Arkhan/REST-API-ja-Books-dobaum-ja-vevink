import { Author, Book, Genre, Publisher, Review } from "./index";
import { mockAuthors, mockBooks, mockGenres, mockPublishers, mockReviews } from "./mockData";

export type InMemoryStore = {
  authors: Author[];
  books: Book[];
  publishers: Publisher[];
  reviews: Review[];
  genres: Genre[];
};

export const inMemoryStore: InMemoryStore = {
  authors: mockAuthors,
  books: mockBooks,
  publishers: mockPublishers,
  reviews: mockReviews,
  genres: mockGenres,
};
