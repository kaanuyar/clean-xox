import { JoinMatchController } from "@/presentation/controllers";
import { makeJoinMatchUsecase } from "@/entrypoint/factories/usecases";

export const makeJoinMatchController = (): JoinMatchController => {
    return new JoinMatchController(makeJoinMatchUsecase());
}