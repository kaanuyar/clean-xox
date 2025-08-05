import { playMatchRequestSchema } from '@/src/presentation/contracts';
import { Validation } from '@/src/presentation/abstractions';

export class PlayMatchValidation extends Validation {
    protected getSchema() {
        return playMatchRequestSchema;
    }
}