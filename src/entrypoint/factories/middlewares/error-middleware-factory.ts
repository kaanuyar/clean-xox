import { ErrorMiddleware } from "@/src/presentation/middlewares";
import { adaptErrorMiddleware } from "@/src/entrypoint/adapters";
import { logger } from "@/src/entrypoint/instances/logging";

export const makeErrorMiddleware = (): ErrorMiddleware => {
    return new ErrorMiddleware(logger);
}

export const buildErrorHandler = () => {
    return adaptErrorMiddleware(makeErrorMiddleware());
}