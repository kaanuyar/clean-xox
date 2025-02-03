import { ValidationMiddleware } from "@/presentation/middlewares";
import { JoinMatchValidation } from "@/presentation/validations";

export const makeJoinMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new JoinMatchValidation());
}