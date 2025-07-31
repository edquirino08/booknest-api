import { z } from "zod";

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

export const BookResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string(),
  publisher: z.string(),
  description: z.string().nullable().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
  genre: z.string().nullable().optional(),
  pages: z.number().nullable().optional(),
  language: z.string().nullable().optional(),
  available: z.boolean(),
  rating: z.number().nullable().optional(),
});

export type ListBookResponseDto = {
  books?: BookResponseDto[];
  pageable: {
    page: number;
    size: number;
    numberOfElements: number;
  };
};

export const ListBookResponseSchema = z.object({
  books: z.array(BookResponseSchema).optional(),
  pageable: z.object({
    page: z.number(),
    size: z.number(),
    numberOfElements: z.number(),
  }),
});

export const ListBookResponseDtoSchema = z.object({
  books: z.array(BookResponseSchema).optional(),
});
