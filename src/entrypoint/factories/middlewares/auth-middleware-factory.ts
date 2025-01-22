import { AuthMiddleware } from "@/presentation/middlewares";
import { makeValidateTokenUsecase } from "@/entrypoint/factories/usecases";

export const makeAuthMiddleware = (): AuthMiddleware => {
    return new AuthMiddleware(makeValidateTokenUsecase());
}