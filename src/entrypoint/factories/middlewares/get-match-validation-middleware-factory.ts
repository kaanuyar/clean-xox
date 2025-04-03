import { ValidationMiddleware } from "@/presentation/middlewares";
import { GetMatchValidation } from "@/presentation/validations";
import { adaptMiddleware } from "@/entrypoint/adapters";

export const makeGetMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new GetMatchValidation());
}

export const buildGetMatchValidation = () => {
    return adaptMiddleware(makeGetMatchValidationMiddleware());
}