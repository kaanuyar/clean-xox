import { z } from 'zod'

export const CreateMatchResponseSchema = z.object({
    matchCode: z.string()
});