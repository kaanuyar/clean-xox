import { InvalidParamError } from '@/presentation/errors';
import { CompareFieldsValidation } from '@/presentation/validation/validators';
import { faker } from '@faker-js/faker'

const field = faker.word.noun();
const fieldToCompare = faker.word.noun();

const makeSut = (): CompareFieldsValidation => {
    return new CompareFieldsValidation(field, fieldToCompare);
}

describe('CompareFieldsValidation', () => {
    test('Should return an InvalidParameter if validation fails', () => {
        const sut = makeSut();
        const error = sut.validate({
            [field]: 'any_field',
            [fieldToCompare]: 'other_field'
        });
        expect(error).toEqual(new InvalidParamError(fieldToCompare));
    });

    test('Should not return if validaiton succeeds', () => {
        const sut = makeSut();
        const error = sut.validate({
            [field]: 'any_field',
            [fieldToCompare]: 'any_field'
        });
        expect(error).toBeFalsy();
    });
});