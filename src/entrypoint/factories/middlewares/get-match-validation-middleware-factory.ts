import { ValidationMiddleware } from "@/presentation/middlewares";
import { GetMatchValidation } from "@/presentation/validations";

export const makeGetMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new GetMatchValidation());
}