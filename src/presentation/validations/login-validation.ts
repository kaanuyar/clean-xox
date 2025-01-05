import { Validation } from '@/presentation/protocols';
import { z } from 'zod'

export class LoginValidation extends Validation {
    protected getSchema(): z.ZodTypeAny {
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