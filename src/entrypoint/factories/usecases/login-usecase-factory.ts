import { PasswordHasher, TokenCrypter } from "@/infrastructure/cryptography";
import { makeAccountRepository } from '@/entrypoint/factories/db';
import { LoginUsecase } from "@/application/usecases";
import { env } from '@/entrypoint/config';

export const makeLoginUsecase = (): LoginUsecase => {
    const salt = 12;
    const passwordHasher = new PasswordHasher(salt);
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    const accountRepository = makeAccountRepository();

    return new LoginUsecase(tokenCrypter, passwordHasher, accountRepository);
}