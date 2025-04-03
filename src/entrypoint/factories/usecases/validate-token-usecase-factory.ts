import { ValidateTokenUsecase } from "@/application/usecases";
import { TokenCrypter } from "@/infrastructure/cryptography";
import { env } from '@/entrypoint/config';

export const makeValidateTokenUsecase = (): ValidateTokenUsecase => {
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    return new ValidateTokenUsecase(tokenCrypter);
}