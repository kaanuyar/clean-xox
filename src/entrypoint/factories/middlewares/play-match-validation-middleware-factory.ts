import { ValidationMiddleware } from "@/presentation/middlewares";
import { PlayMatchValidation } from "@/presentation/validations";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makePlayMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new PlayMatchValidation());
}

export const buildPlayMatchValidation = () => {
    return adaptMiddleware(makePlayMatchValidationMiddleware());
}