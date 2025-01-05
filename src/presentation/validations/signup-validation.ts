import { Validation, ValidationResult } from '@/presentation/protocols';
import { z } from 'zod'

export class SignUpValidation implements Validation {
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
            name: z.string({
                required_error: 'Name is required',
                invalid_type_error: 'Name must be a string'
            }).max(50, {
                message: 'Name must not exceed 50 characters'
            }),
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
            }),
            passwordConfirmation: z.string({
                required_error: 'PasswordConfirmation is required',
                invalid_type_error: 'PasswordConfirmation must be a string'
            }).max(50, {
                message: 'PasswordConfirmation must not exceed 50 characters'
            }),
        }).refine((data) => data.password === data.passwordConfirmation, {
            message: 'Passwords do not match',
            path: ['passwordConfirmationAction']
        });
    }
}