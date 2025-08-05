import { ValidateTokenUsecase } from "@/src/application/usecases";
import { TokenCrypter } from "@/src/infrastructure/cryptography";
import { env } from '@/src/entrypoint/config';

export const makeValidateTokenUsecase = (): ValidateTokenUsecase => {
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    return new ValidateTokenUsecase(tokenCrypter);
}