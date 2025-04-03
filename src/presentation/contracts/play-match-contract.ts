import { z } from 'zod'

export const playMatchRequestParamsSchema = z.object({
    code: z
        .string({ invalid_type_error: 'Code must be a string' })
        .length(8, { message: 'Code must be exactly 8 characters long' })
});

export const playMatchRequestBodySchema = z.object({
    symbolPosition: z
        .number({
            required_error: 'SymbolPosition is required',
            invalid_type_error: 'SymbolPosition must be a number'
        })
        .min(0, 'SymbolPosition must be a number between 0 and 8')
        .max(8, 'SymbolPosition must be a number between 0 and 8')
});

export const playMatchRequestSchema = z.intersection(playMatchRequestParamsSchema, playMatchRequestBodySchema);

export type PlayMatchRequest = z.infer<typeof playMatchRequestSchema>;