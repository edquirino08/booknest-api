import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginRequestDto = z.infer<typeof LoginSchema>;

export type LoginResponseDto = {
  jwt: string;
};

export const UserLoginResponseDtoSchema = z.object({
  message: z.string(),
  data: z.object({
    jwt: z.string(),
  }),
});
