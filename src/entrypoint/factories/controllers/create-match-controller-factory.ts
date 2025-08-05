import { makeCreateMatchUsecase } from "@/src/entrypoint/factories/usecases";
import { CreateMatchController } from "@/src/presentation/controllers";
import { adaptRoute } from "@/src/entrypoint/adapters";

export const makeCreateMatchController = (): CreateMatchController => {
    return new CreateMatchController(makeCreateMatchUsecase());
}

export const buildCreateMatchController = () => {
    return adaptRoute(makeCreateMatchController());
}