import { makeGetMatchUsecase } from "@/entrypoint/factories/usecases";
import { GetMatchController } from "@/presentation/controllers";
import { adaptRoute } from "@/entrypoint/adapters";

export const makeGetMatchController = (): GetMatchController => {
    return new GetMatchController(makeGetMatchUsecase());
}

export const buildGetMatchController = () => {
    return adaptRoute(makeGetMatchController());
}