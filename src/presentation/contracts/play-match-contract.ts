import { z } from 'zod'

export const PlayMatchRequestParamsSchema = z.object({
    code: z
        .string({ invalid_type_error: 'Code must be a string' })
        .length(8, { message: 'Code must be exactly 8 characters long' })
});

export const PlayMatchRequestBodySchema = z.object({
    symbolPosition: z
        .number({
            required_error: 'SymbolPosition is required',
            invalid_type_error: 'SymbolPosition must be a number'
        })
        .min(0, 'SymbolPosition must be a number between 0 and 8')
        .max(8, 'SymbolPosition must be a number between 0 and 8')
});

export const PlayMatchRequestSchema = z.intersection(PlayMatchRequestParamsSchema, PlayMatchRequestBodySchema);