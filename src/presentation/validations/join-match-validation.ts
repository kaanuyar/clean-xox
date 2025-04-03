import { joinMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class JoinMatchValidation extends Validation {
    protected getSchema() {
        return joinMatchRequestSchema;
    }
}