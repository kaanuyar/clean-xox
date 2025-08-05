import { CreateMatchUsecase } from "@/src/application/usecases";
import { makeMatchRepository } from "@/src/entrypoint/factories/db";

export const makeCreateMatchUsecase = (): CreateMatchUsecase => {
    const matchRepository = makeMatchRepository();
    return new CreateMatchUsecase(matchRepository);
}