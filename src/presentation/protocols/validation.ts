import { ErrorResponse } from '@/presentation/protocols/error-response';
import { z } from 'zod'

export abstract class Validation {
    protected readonly schema: z.ZodTypeAny;

    constructor() {
        this.schema = this.getSchema();
    }

    protected abstract getSchema(): z.ZodTypeAny;

    public validate(input: any): ValidationResult {
        const result = this.schema.safeParse(input);
        if (result.success) {
            return {
                isSuccess: true,
                errors: []
            }
        }

        const errors = result.error.errors.map(err => ({ message: err.message }));
        return {
            isSuccess: false,
            errors: errors
        }
    }
}

export type ValidationResult = {
    isSuccess: boolean,
    errors: ErrorResponse
}