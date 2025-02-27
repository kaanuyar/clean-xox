import { ValidationMiddleware } from "@/presentation/middlewares";
import { PlayMatchValidation } from "@/presentation/validations";

export const makePlayMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new PlayMatchValidation());
}