import { z } from "zod";

export const RegisterRentalSchema = z.object({
  bookId: z.number().positive(),
  rentalTime: z.number().positive(),
  userId: z.number().positive(),
});

export type RegisterRentalRequestDto = z.infer<typeof RegisterRentalSchema>;
