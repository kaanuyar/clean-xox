import { makeCreateMatchUsecase } from "@/entrypoint/factories/usecases";
import { CreateMatchController } from "@/presentation/controllers";

export const makeCreateMatchController = (): CreateMatchController => {
    return new CreateMatchController(makeCreateMatchUsecase());
}