import { loginRequestSchema } from '@/src/presentation/contracts';
import { Validation } from '@/src/presentation/abstractions';

export class LoginValidation extends Validation {
    protected getSchema() {
        return loginRequestSchema;
    }
}