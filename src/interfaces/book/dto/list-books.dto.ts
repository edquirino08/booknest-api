export type BookResponseDto = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  description?: string | null;
  publishedAt?: Date | null;
  genre?: string | null;
  pages?: number | null;
  language?: string | null;
  available: boolean;
  rating?: number | null;
};

export type ListBookResponseDto = {
  books: BookResponseDto[];
};
