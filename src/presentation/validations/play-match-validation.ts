import { PlayMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/protocols';

export class PlayMatchValidation extends Validation {
    protected getSchema() {
        return PlayMatchRequestSchema;
    }
}