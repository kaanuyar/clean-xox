import { makeGetMatchUsecase } from "@/entrypoint/factories/usecases";
import { GetMatchController } from "@/presentation/controllers";

export const makeGetMatchController = (): GetMatchController => {
    return new GetMatchController(makeGetMatchUsecase());
}