import env from "@/entrypoint/config/env";
import { RegisterUsecase } from "@/application/usecases";
import { makeAccountRepository } from "@/entrypoint/factories/db";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";

export const makeRegisterUsecase = (): RegisterUsecase => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountRepository = makeAccountRepository();
    return new RegisterUsecase(bcryptAdapter, jwtAdapter, accountRepository, accountRepository);
}