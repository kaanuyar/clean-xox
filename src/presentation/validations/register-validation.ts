import { registerRequestSchema } from '@/src/presentation/contracts';
import { Validation } from '@/src/presentation/abstractions';

export class RegisterValidation extends Validation {
    protected getSchema() {
        return registerRequestSchema
            .refine((data) => (data.password === data.passwordConfirmation), { message: 'Passwords do not match' });
    }
}