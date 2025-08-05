import { ValidationMiddleware } from "@/src/presentation/middlewares";
import { JoinMatchValidation } from "@/src/presentation/validations";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makeJoinMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new JoinMatchValidation());
}

export const buildJoinMatchValidation = () => {
    return adaptMiddleware(makeJoinMatchValidationMiddleware());
}