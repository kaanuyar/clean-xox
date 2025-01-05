import { Validation } from '@/presentation/protocols';
import { z } from 'zod'

export class RegisterValidation extends Validation {
    protected getSchema(): z.ZodTypeAny {
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