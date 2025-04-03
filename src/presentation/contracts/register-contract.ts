import { z } from 'zod'

export const registerRequestSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string'
        }),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string'
        }),
    passwordConfirmation: z
        .string({
            required_error: 'PasswordConfirmation is required',
            invalid_type_error: 'PasswordConfirmation must be a string'
        }),
});

export const registerResponseSchema = z.object({
    accessToken: z.string()
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;