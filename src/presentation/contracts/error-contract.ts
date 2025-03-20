import { z } from 'zod'

export const ErrorResponseSchema = z.object({
    errors: z
        .array(z
            .object({
                message: z.string()
            })
        )
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema.shape.errors>;