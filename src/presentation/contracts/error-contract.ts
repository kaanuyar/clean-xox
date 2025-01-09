import { z } from 'zod'

export const ErrorResponseSchema = z.object({
    errors: z
        .array(z
            .object({
                message: z.string()
            })
        )
});