import { PasswordHasher, TokenCrypter } from "@/infrastructure/cryptography";
import { RegisterUsecase } from "@/application/usecases";
import { makeAccountRepository } from "@/entrypoint/factories/db";
import { env } from '@/entrypoint/config';

export const makeRegisterUsecase = (): RegisterUsecase => {
    const salt = 12;
    const passwordHasher = new PasswordHasher(salt);
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    const accountRepository = makeAccountRepository();
    return new RegisterUsecase(passwordHasher, tokenCrypter, accountRepository, accountRepository);
}