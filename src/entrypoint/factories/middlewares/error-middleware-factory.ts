import { ErrorMiddleware } from "@/presentation/middlewares";
import { adaptErrorMiddleware } from "@/entrypoint/adapters";
import { logger } from "@/entrypoint/instances/logging";

export const makeErrorMiddleware = (): ErrorMiddleware => {
    return new ErrorMiddleware(logger);
}

export const buildErrorHandler = () => {
    return adaptErrorMiddleware(makeErrorMiddleware());
}