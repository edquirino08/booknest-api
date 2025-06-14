import { z } from "zod";

export const PageableRequestSchema = z
  .object({
    sort: z.union([z.string(), z.array(z.string())]).default([]),
    page: z.coerce.number().positive().default(1),
    size: z.coerce.number().positive().default(10),
  })
  .transform((data) => ({
    ...data,
    sort: Array.isArray(data.sort) ? data.sort : [data.sort],
  }));

export type PageableRequestDto = z.infer<typeof PageableRequestSchema>;
