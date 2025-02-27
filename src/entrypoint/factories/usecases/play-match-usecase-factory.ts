import { PlayMatchUsecase } from "@/application/usecases";
import { makeMatchRepository, makeMatchUnitOfWork } from "@/entrypoint/factories/db";

export const makePlayMatchUsecase = (): PlayMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const matchUnitOfWork = makeMatchUnitOfWork();
    return new PlayMatchUsecase(matchRepository, matchUnitOfWork);
}