import { GetMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class GetMatchValidation extends Validation {
    protected getSchema() {
        return GetMatchRequestSchema;
    }
}