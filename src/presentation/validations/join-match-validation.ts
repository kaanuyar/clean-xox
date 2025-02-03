import { JoinMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class JoinMatchValidation extends Validation {
    protected getSchema() {
        return JoinMatchRequestSchema;
    }
}