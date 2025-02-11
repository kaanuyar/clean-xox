import { JoinMatchUsecase } from "@/application/usecases";
import { makeMatchRepository, makeMatchUnitOfWork } from "@/entrypoint/factories/db";

export const makeJoinMatchUsecase = (): JoinMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const matchUnitOfWork = makeMatchUnitOfWork();
    return new JoinMatchUsecase(matchRepository, matchUnitOfWork);
}