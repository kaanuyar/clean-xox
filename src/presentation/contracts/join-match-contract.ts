import { z } from 'zod'

export const JoinMatchRequestSchema = z.object({
    code: z
        .string({ invalid_type_error: 'Code must be a string' })
        .length(8, { message: 'Code must be exactly 8 characters long' })
});

export const JoinMatchResponseSchema = z.object({
    success: z.string(),
    message: z.string()
});