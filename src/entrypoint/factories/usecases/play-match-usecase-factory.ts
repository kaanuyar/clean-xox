import { PlayMatchUsecase } from "@/src/application/usecases";
import { makeMatchRepository, makeMatchUnitOfWork } from "@/src/entrypoint/factories/db";

export const makePlayMatchUsecase = (): PlayMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const matchUnitOfWork = makeMatchUnitOfWork();
    return new PlayMatchUsecase(matchRepository, matchUnitOfWork);
}