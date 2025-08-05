import { GetMatchUsecase } from "@/src/application/usecases";
import { makeMatchRepository } from "@/src/entrypoint/factories/db";

export const makeGetMatchUsecase = (): GetMatchUsecase => {
    const matchRepository = makeMatchRepository();
    return new GetMatchUsecase(matchRepository);
}