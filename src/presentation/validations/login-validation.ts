import { loginRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/abstractions';

export class LoginValidation extends Validation {
    protected getSchema() {
        return loginRequestSchema;
    }
}