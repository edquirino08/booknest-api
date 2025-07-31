import { z } from "zod";

export const CreateUserDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  fullName: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export class CreateUserResponseDto {
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.username = obj.username;
    this.email = obj.email;
    this.createdAt = obj.createdAt;
    this.role = obj.role;
  }

  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  role: string;
}

export const CreateUserResponseDtoSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    createdAt: z.string().datetime(),
    role: z.string(),
  }),
});
