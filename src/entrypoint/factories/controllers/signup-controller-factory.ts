import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols';
import { ErrorControllerDecorator, ValidationControllerDecorator } from '@/presentation/decorators';
import { makeSignUpValidation } from '@/entrypoint/factories/validatons';
import { makeSignUpUsecase } from '@/entrypoint/factories/usecases';

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(makeSignUpUsecase());
    const validationController =  new ValidationControllerDecorator(controller, makeSignUpValidation());
    return new ErrorControllerDecorator(validationController);
}