import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLoginUsecase } from "@/entrypoint/factories/usecases";
import { ErrorControllerDecorator, ValidationControllerDecorator } from "@/presentation/decorators";
import { makeLoginValidation } from "@/entrypoint/factories/validatons";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeLoginUsecase());
    const validationController = new ValidationControllerDecorator(controller, makeLoginValidation());
    return new ErrorControllerDecorator(validationController);
}