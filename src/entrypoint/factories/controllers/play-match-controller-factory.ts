import { makePlayMatchUsecase } from "@/entrypoint/factories/usecases";
import { PlayMatchController } from "@/presentation/controllers";

export const makePlayMatchController = (): PlayMatchController => {
    return new PlayMatchController(makePlayMatchUsecase());
}