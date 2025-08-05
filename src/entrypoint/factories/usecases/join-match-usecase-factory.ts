import { JoinMatchUsecase } from "@/src/application/usecases";
import { makeMatchRepository, makeMatchUnitOfWork } from "@/src/entrypoint/factories/db";

export const makeJoinMatchUsecase = (): JoinMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const matchUnitOfWork = makeMatchUnitOfWork();
    return new JoinMatchUsecase(matchRepository, matchUnitOfWork);
}