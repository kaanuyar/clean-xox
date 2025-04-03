import { AuthMiddleware } from "@/presentation/middlewares";
import { makeValidateTokenUsecase } from "@/entrypoint/factories/usecases";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makeAuthMiddleware = (): AuthMiddleware => {
    return new AuthMiddleware(makeValidateTokenUsecase());
}

export const buildAuthCheck = () => {
    return adaptMiddleware(makeAuthMiddleware());
}