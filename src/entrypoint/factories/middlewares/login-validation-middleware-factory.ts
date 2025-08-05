import { ValidationMiddleware } from "@/src/presentation/middlewares";
import { LoginValidation } from "@/src/presentation/validations";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makeLoginValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new LoginValidation());
}

export const buildLoginValidation = () => {
    return adaptMiddleware(makeLoginValidationMiddleware());
}