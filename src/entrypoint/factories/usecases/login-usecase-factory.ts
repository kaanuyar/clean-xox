import env from '@/entrypoint/config/env';
import { LoginUsecase } from "@/application/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/cryptography";
import { makeAccountRepository } from '@/entrypoint/factories/db';

export const makeLoginUsecase = (): LoginUsecase => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountRepository = makeAccountRepository();

    return new LoginUsecase(jwtAdapter, bcryptAdapter, accountRepository);
}