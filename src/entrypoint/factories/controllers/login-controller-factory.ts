import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLoginUsecase } from "@/entrypoint/factories/usecases";
import { ErrorControllerDecorator, ValidationControllerDecorator } from "@/presentation/decorators";
import { LoginValidation } from "@/presentation/validations";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeLoginUsecase());
    const validationController = new ValidationControllerDecorator(controller, new LoginValidation());
    return new ErrorControllerDecorator(validationController);
}