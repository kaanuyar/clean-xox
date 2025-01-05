import { Validation, ValidationResult } from '@/presentation/protocols';
import { z } from 'zod'

export class LoginValidation implements Validation {
    private readonly schema: z.ZodTypeAny;

    constructor() {
        this.schema = this.createSchema();
    }

    public validate(input: any): ValidationResult {
        const result = this.schema.safeParse(input);
        if (result.success) {
            return {
                isSuccess: true,
                errorResponse: []
            }
        }

        const errorResponse = result.error.errors.map(err => ({
            message: err.message
        }));

        return {
            isSuccess: false,
            errorResponse: errorResponse
        }
    }

    private createSchema(): z.ZodTypeAny {
        return z.object({
            email: z.string({
                required_error: 'Email is required'
            }).email({
                message: 'Invalid email address'
            }),
            password: z.string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string'
            }).max(50, {
                message: 'Password must not exceed 50 characters'
            })
        });
    }
}