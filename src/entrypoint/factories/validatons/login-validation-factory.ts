import { Validation } from "@/presentation/protocols";
import { EmailValidation, EmailValidatorAdapter, RequiredFieldValidation, ValidationComposite } from "@/presentation/validation/validators";

export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = [];

    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    return new ValidationComposite(validations);
}