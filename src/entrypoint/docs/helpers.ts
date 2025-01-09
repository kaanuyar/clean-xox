import { z } from 'zod'

export const jsonContent = (schema: z.ZodTypeAny, description = '') => {
    return {
        description,
        content: {
            'application/json': {
                schema
            }
        }
    }
}