import { Router } from "express";
import { adaptErrorMiddleware, adaptMiddleware, adaptRoute } from "@/entrypoint/adapters";
import { makeAuthMiddleware, makeErrorMiddleware } from "@/entrypoint/factories/middlewares";
import { makeCreateMatchController } from "@/entrypoint/factories/controllers";

export default (router: Router): void => {
    const auth = adaptMiddleware(makeAuthMiddleware());
    const errorHandler = adaptErrorMiddleware(makeErrorMiddleware());
    const createMatchController = adaptRoute(makeCreateMatchController());

    router.post('/match', auth, createMatchController, errorHandler);
}