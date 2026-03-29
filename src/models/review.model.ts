export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type ReviewCreate = Omit<Review, 'id' | 'createdAt'>;
export type ReviewUpdate = Partial<ReviewCreate>;
