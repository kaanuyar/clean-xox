import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols';
import { ErrorControllerDecorator, ValidationControllerDecorator } from '@/presentation/decorators';
import { makeSignUpUsecase } from '@/entrypoint/factories/usecases';
import { SignUpValidation } from '@/presentation/validations';

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(makeSignUpUsecase());
    const validationController =  new ValidationControllerDecorator(controller, new SignUpValidation());
    return new ErrorControllerDecorator(validationController);
}