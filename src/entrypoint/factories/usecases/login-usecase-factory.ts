import { PasswordHasher, TokenCrypter } from "@/src/infrastructure/cryptography";
import { makeAccountRepository } from '@/src/entrypoint/factories/db';
import { LoginUsecase } from "@/src/application/usecases";
import { env } from '@/src/entrypoint/config';

export const makeLoginUsecase = (): LoginUsecase => {
    const salt = 12;
    const passwordHasher = new PasswordHasher(salt);
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    const accountRepository = makeAccountRepository();

    return new LoginUsecase(tokenCrypter, passwordHasher, accountRepository);
}