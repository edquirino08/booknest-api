import { z } from "zod";

export const createUserSchemaRequest = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});
export type CreateUserRequestDto = z.infer<typeof createUserSchemaRequest>;

export const createUserSchemaResponse = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});
export type CreateUserResponseDto = z.infer<typeof createUserSchemaResponse>;
