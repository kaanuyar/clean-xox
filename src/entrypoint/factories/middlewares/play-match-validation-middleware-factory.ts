import { ValidationMiddleware } from "@/src/presentation/middlewares";
import { PlayMatchValidation } from "@/src/presentation/validations";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makePlayMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new PlayMatchValidation());
}

export const buildPlayMatchValidation = () => {
    return adaptMiddleware(makePlayMatchValidationMiddleware());
}