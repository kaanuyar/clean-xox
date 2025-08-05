import { joinMatchRequestSchema } from '@/src/presentation/contracts';
import { Validation } from '@/src/presentation/abstractions';

export class JoinMatchValidation extends Validation {
    protected getSchema() {
        return joinMatchRequestSchema;
    }
}