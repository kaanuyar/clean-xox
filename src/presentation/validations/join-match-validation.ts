import { joinMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/abstractions';

export class JoinMatchValidation extends Validation {
    protected getSchema() {
        return joinMatchRequestSchema;
    }
}