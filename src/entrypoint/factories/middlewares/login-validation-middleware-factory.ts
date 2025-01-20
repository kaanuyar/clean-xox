import { ValidationMiddleware } from "@/presentation/middlewares";
import { LoginValidation } from "@/presentation/validations";

export const makeLoginValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new LoginValidation());
}