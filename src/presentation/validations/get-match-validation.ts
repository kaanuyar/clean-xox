import { getMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/abstractions';

export class GetMatchValidation extends Validation {
    protected getSchema() {
        return getMatchRequestSchema;
    }
}