import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLoginUsecase } from "@/entrypoint/factories/usecases";
import { adaptRoute } from "@/entrypoint/adapters";

export const makeLoginController = (): Controller => {
    return new LoginController(makeLoginUsecase());
}

export const buildLoginController = () => {
    return adaptRoute(makeLoginController());
}