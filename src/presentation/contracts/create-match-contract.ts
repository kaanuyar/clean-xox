import { z } from 'zod'

export const createMatchResponseSchema = z.object({
    matchCode: z.string()
});

export type CreateMatchResponse = z.infer<typeof createMatchResponseSchema>;