import { makeGetMatchUsecase } from "@/src/entrypoint/factories/usecases";
import { GetMatchController } from "@/src/presentation/controllers";
import { adaptRoute } from "@/src/entrypoint/adapters";

export const makeGetMatchController = (): GetMatchController => {
    return new GetMatchController(makeGetMatchUsecase());
}

export const buildGetMatchController = () => {
    return adaptRoute(makeGetMatchController());
}