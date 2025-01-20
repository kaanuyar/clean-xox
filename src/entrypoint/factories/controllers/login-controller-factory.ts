import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLoginUsecase } from "@/entrypoint/factories/usecases";

export const makeLoginController = (): Controller => {
    return new LoginController(makeLoginUsecase());
}