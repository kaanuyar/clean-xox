import { ValidationMiddleware } from "@/src/presentation/middlewares";
import { RegisterValidation } from "@/src/presentation/validations";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makeRegisterValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new RegisterValidation());
}

export const buildRegisterValidation = () => {
    return adaptMiddleware(makeRegisterValidationMiddleware());
}