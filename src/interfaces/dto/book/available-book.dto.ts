import { z } from "zod";

export const AvailableBookSchema = z
  .object({
    sort: z.union([z.string(), z.array(z.string())]).default([]),
    page: z.coerce.number().positive().default(1),
    size: z.coerce.number().positive().default(10),
    name: z.string().optional(),
    genre: z.string().optional(),
    author: z.string().optional(),
    language: z.string().optional(),
    publisher: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    sort: Array.isArray(data.sort) ? data.sort : [data.sort],
  }));

export type FindAvailableBooksRequestDto = z.infer<typeof AvailableBookSchema>;
