import { makePlayMatchUsecase } from "@/entrypoint/factories/usecases";
import { PlayMatchController } from "@/presentation/controllers";
import { adaptRoute } from "@/entrypoint/adapters";

export const makePlayMatchController = (): PlayMatchController => {
    return new PlayMatchController(makePlayMatchUsecase());
}

export const buildPlayMatchController = () => {
    return adaptRoute(makePlayMatchController());
}