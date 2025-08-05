import { ValidationMiddleware } from "@/src/presentation/middlewares";
import { GetMatchValidation } from "@/src/presentation/validations";
import { adaptMiddleware } from "@/src/entrypoint/adapters";

export const makeGetMatchValidationMiddleware = (): ValidationMiddleware => {
    return new ValidationMiddleware(new GetMatchValidation());
}

export const buildGetMatchValidation = () => {
    return adaptMiddleware(makeGetMatchValidationMiddleware());
}