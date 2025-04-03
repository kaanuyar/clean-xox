import { ValidationMiddleware } from "@/presentation/middlewares";
import { JoinMatchValidation } from "@/presentation/validations";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makeJoinMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new JoinMatchValidation());
}

export const buildJoinMatchValidation = () => {
    return adaptMiddleware(makeJoinMatchValidationMiddleware());
}