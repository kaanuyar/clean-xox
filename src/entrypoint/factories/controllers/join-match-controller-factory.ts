import { JoinMatchController } from "@/src/presentation/controllers";
import { makeJoinMatchUsecase } from "@/src/entrypoint/factories/usecases";
import { adaptRoute } from "@/src/entrypoint/adapters";

export const makeJoinMatchController = (): JoinMatchController => {
    return new JoinMatchController(makeJoinMatchUsecase());
}

export const buildJoinMatchController = () => {
    return adaptRoute(makeJoinMatchController());
}