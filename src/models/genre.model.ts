export interface Genre {
  id: string;
  name: string;
}

export type GenreCreate = Omit<Genre, 'id'>;
export type GenreUpdate = Partial<GenreCreate>;
