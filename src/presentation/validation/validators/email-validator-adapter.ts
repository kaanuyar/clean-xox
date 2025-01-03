import { isEmail } from 'validator'
import { EmailValidator } from '@/presentation/validation/protocols';

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return isEmail(email);
    }
}