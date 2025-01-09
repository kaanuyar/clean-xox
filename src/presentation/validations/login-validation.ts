import { LoginRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class LoginValidation extends Validation {
    protected getSchema() {
        return LoginRequestSchema;
    }
}