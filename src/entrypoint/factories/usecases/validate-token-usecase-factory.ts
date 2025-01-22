import env from "@/entrypoint/config/env";
import { ValidateTokenUsecase } from "@/application/usecases";
import { JwtAdapter } from "@/infrastructure/cryptography";

export const makeValidateTokenUsecase = (): ValidateTokenUsecase => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    return new ValidateTokenUsecase(jwtAdapter);
} 