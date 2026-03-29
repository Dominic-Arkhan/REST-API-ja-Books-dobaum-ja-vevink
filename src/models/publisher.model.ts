export interface Publisher {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  website?: string;
  createdAt: string;
}

export type PublisherCreate = Omit<Publisher, 'id' | 'createdAt'>;
export type PublisherUpdate = Partial<PublisherCreate>;
