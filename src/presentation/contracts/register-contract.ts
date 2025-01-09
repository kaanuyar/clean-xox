import { z } from 'zod'

export const RegisterRequestSchema = z.object({
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

export const RegisterResponseSchema = z.object({
    accessToken: z.string(),
    name: z.string()
});