import { z } from "zod";

export const DeleteBookSchema = z.object({
  id: z.string().transform((val) => Number(val)),
});

export type DeleteBookDto = z.infer<typeof DeleteBookSchema>;
