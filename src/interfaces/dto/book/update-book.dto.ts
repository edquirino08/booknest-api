import { z } from "zod";

export const UpdateBookSchema = z.object({
  id: z.number().int().positive(),
  available: z.boolean().optional().nullable(),
  rating: z.number().positive().optional().nullable(),
  description: z.string().max(255).optional().nullable(),
  copies: z.number().positive().optional().nullable(),
  genre: z.string().max(20).optional().nullable(),
});

export type UpdateBookDto = z.infer<typeof UpdateBookSchema>;
