import { z } from "zod";

export const BookReturnSchema = z.object({
  bookId: z.number().positive(),
  userId: z.number().positive(),
});

export type BookReturnRequestDto = z.infer<typeof BookReturnSchema>;
