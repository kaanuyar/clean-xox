import { AuthMiddleware } from "@/src/presentation/middlewares";
import { makeValidateTokenUsecase } from "@/src/entrypoint/factories/usecases";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makeAuthMiddleware = (): AuthMiddleware => {
    return new AuthMiddleware(makeValidateTokenUsecase());
}

export const buildAuthCheck = () => {
    return adaptMiddleware(makeAuthMiddleware());
}