import { PasswordHasher, TokenCrypter } from "@/src/infrastructure/cryptography";
import { RegisterUsecase } from "@/src/application/usecases";
import { makeAccountRepository } from "@/src/entrypoint/factories/db";
import { env } from '@/src/entrypoint/config';

export const makeRegisterUsecase = (): RegisterUsecase => {
    const salt = 12;
    const passwordHasher = new PasswordHasher(salt);
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    const accountRepository = makeAccountRepository();
    return new RegisterUsecase(passwordHasher, tokenCrypter, accountRepository, accountRepository);
}