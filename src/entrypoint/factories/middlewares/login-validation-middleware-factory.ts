import { ValidationMiddleware } from "@/presentation/middlewares";
import { LoginValidation } from "@/presentation/validations";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makeLoginValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new LoginValidation());
}

export const buildLoginValidation = () => {
    return adaptMiddleware(makeLoginValidationMiddleware());
}