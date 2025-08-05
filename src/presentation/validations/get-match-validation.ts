import { getMatchRequestSchema } from '@/src/presentation/contracts';
import { Validation } from '@/src/presentation/abstractions';

export class GetMatchValidation extends Validation {
    protected getSchema() {
        return getMatchRequestSchema;
    }
}