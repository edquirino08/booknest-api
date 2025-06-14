import { z } from "zod";

export const RegisterBookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  author: z.string().min(1, "Author is required"),
  publisher: z.string().min(1, "Publiser is required"),
  copies: z.number().int().min(0),
  description: z.string().optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
  genre: z.string().optional().nullable(),
  pages: z.number().int().positive().optional().nullable(),
  language: z.string().optional().nullable(),
  available: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional().nullable(),
});

export type RegisterBookRequestDto = z.infer<typeof RegisterBookSchema>;

export type RegisterBookResponseDto = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  copies: number;
  description?: string | null;
  publishedAt?: Date | null;
  genre?: string | null;
  pages?: number | null;
  language?: string | null;
  available: boolean;
  rating?: number | null;
  dateReg: Date;
};
