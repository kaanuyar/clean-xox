import { z } from 'zod'

export const LoginRequestSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string'
        })
});

export const LoginResponseSchema = z.object({
    accessToken: z.string()
});