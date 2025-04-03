import { registerRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class RegisterValidation extends Validation {
    protected getSchema() {
        return registerRequestSchema
            .refine((data) => (data.password === data.passwordConfirmation), { message: 'Passwords do not match' });
    }
}