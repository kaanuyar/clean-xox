import env from "@/entrypoint/api/env";
import { LoginUsecase } from "@/application/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";
import { AccountMongoRepository } from "@/infrastructure/db/mongodb";

export const makeLoginUsecase = (): LoginUsecase => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository();

    return new LoginUsecase(jwtAdapter, bcryptAdapter, accountMongoRepository, accountMongoRepository);
}