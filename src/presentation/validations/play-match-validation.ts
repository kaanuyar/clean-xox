import { playMatchRequestSchema } from '@/presentation/contracts';
import { Validation } from '@/presentation/abstractions';

export class PlayMatchValidation extends Validation {
    protected getSchema() {
        return playMatchRequestSchema;
    }
}