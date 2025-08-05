import { LoginController } from "@/src/presentation/controllers";
import { Controller } from "@/src/presentation/abstractions";
import { makeLoginUsecase } from "@/src/entrypoint/factories/usecases";
import { adaptRoute } from "@/src/entrypoint/adapters";

export const makeLoginController = (): Controller => {
    return new LoginController(makeLoginUsecase());
}

export const buildLoginController = () => {
    return adaptRoute(makeLoginController());
}