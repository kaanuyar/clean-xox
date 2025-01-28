import { CreateMatchUsecase } from "@/application/usecases";
import { makeMatchRepository } from "@/entrypoint/factories/db";
import { UniqueCodeGenerator } from "@/infrastructure/cryptography";

export const makeCreateMatchUsecase = (): CreateMatchUsecase => {
    const matchRepository = makeMatchRepository();
    const uniqueCodeGenerator = new UniqueCodeGenerator();
    return new CreateMatchUsecase(matchRepository, uniqueCodeGenerator);
}