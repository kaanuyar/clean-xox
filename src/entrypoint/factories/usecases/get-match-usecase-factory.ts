import { GetMatchUsecase } from "@/application/usecases";
import { makeMatchRepository } from "@/entrypoint/factories/db";

export const makeGetMatchUsecase = (): GetMatchUsecase => {
    const matchRepository = makeMatchRepository();
    return new GetMatchUsecase(matchRepository);
}