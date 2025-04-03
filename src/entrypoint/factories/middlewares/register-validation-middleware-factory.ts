import { ValidationMiddleware } from "@/presentation/middlewares";
import { RegisterValidation } from "@/presentation/validations";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makeRegisterValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new RegisterValidation());
}

export const buildRegisterValidation = () => {
    return adaptMiddleware(makeRegisterValidationMiddleware());
}