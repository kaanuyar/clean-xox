import { ValidationMiddleware } from "@/presentation/middlewares";
import { RegisterValidation } from "@/presentation/validations";

export const makeRegisterValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new RegisterValidation());
}