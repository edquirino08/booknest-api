import {z} from 'zod';

const CreateUserDtoSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    fullName: z.string().optional()
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
