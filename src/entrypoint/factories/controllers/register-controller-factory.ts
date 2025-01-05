import { RegisterController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols';
import { ErrorControllerDecorator, ValidationControllerDecorator } from '@/presentation/decorators';
import { makeRegisterUsecase } from '@/entrypoint/factories/usecases';
import { RegisterValidation } from '@/presentation/validations';

export const makeRegisterController = (): Controller => {
    const controller = new RegisterController(makeRegisterUsecase());
    const validationController =  new ValidationControllerDecorator(controller, new RegisterValidation());
    return new ErrorControllerDecorator(validationController);
}