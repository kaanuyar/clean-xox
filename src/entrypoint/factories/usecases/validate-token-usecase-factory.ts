import env from "@/entrypoint/config/env";
import { ValidateTokenUsecase } from "@/application/usecases";
import { TokenCrypter } from "@/infrastructure/cryptography";

export const makeValidateTokenUsecase = (): ValidateTokenUsecase => {
    const tokenCrypter = new TokenCrypter(env.jwtSecret);
    return new ValidateTokenUsecase(tokenCrypter);
}