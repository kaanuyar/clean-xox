import { z } from 'zod'

export const CreateMatchResponseSchema = z.object({
    matchCode: z.string()
});

export type CreateMatchResponse = z.infer<typeof CreateMatchResponseSchema>;