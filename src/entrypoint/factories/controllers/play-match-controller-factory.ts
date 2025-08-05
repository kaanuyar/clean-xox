import { makePlayMatchUsecase } from "@/src/entrypoint/factories/usecases";
import { PlayMatchController } from "@/src/presentation/controllers";
import { adaptRoute } from "@/src/entrypoint/adapters";

export const makePlayMatchController = (): PlayMatchController => {
    return new PlayMatchController(makePlayMatchUsecase());
}

export const buildPlayMatchController = () => {
    return adaptRoute(makePlayMatchController());
}