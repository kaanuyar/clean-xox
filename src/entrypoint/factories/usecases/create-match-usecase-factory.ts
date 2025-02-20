import { CreateMatchUsecase } from "@/application/usecases";
import { makeMatchRepository } from "@/entrypoint/factories/db";

export const makeCreateMatchUsecase = (): CreateMatchUsecase => {
    const matchRepository = makeMatchRepository();
    return new CreateMatchUsecase(matchRepository);
}