import { JoinMatchUsecase } from "@/application/usecases";
import { makeMatchRepository } from "@/entrypoint/factories/db";

export const makeJoinMatchUsecase = (): JoinMatchUsecase => {
    const matchRepository = makeMatchRepository();
    return new JoinMatchUsecase(matchRepository, matchRepository, matchRepository);
}