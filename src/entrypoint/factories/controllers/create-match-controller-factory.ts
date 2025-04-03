import { makeCreateMatchUsecase } from "@/entrypoint/factories/usecases";
import { CreateMatchController } from "@/presentation/controllers";
import { adaptRoute } from "@/entrypoint/adapters";

export const makeCreateMatchController = (): CreateMatchController => {
    return new CreateMatchController(makeCreateMatchUsecase());
}

export const buildCreateMatchController = () => {
    return adaptRoute(makeCreateMatchController());
}