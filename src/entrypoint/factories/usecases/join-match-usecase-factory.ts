import { JoinMatchUsecase } from "@/application/usecases";
import { makeMatchPlayerRepository, makeMatchRepository } from "@/entrypoint/factories/db";

export const makeJoinMatchUsecase = (): JoinMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const matchPlayerRepository = makeMatchPlayerRepository();
    return new JoinMatchUsecase(matchRepository, matchRepository, matchPlayerRepository);
}