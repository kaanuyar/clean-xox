import { JoinMatchController } from "@/presentation/controllers";
import { makeJoinMatchUsecase } from "@/entrypoint/factories/usecases";
import { adaptRoute } from "@/entrypoint/adapters";

export const makeJoinMatchController = (): JoinMatchController => {
    return new JoinMatchController(makeJoinMatchUsecase());
}

export const buildJoinMatchController = () => {
    return adaptRoute(makeJoinMatchController());
}