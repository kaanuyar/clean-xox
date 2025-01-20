import { ErrorMiddleware } from "@/presentation/middlewares";

export const makeErrorMiddleware = (): ErrorMiddleware => {
    return new ErrorMiddleware();
}