import { Router } from "express";
import { adaptErrorMiddleware, adaptMiddleware, adaptRoute } from "@/entrypoint/adapters";
import { makeCreateMatchController, makeJoinMatchController, makePlayMatchController } from "@/entrypoint/factories/controllers";
import { makeAuthMiddleware, makeErrorMiddleware, makeJoinMatchValidationMiddleware, makePlayMatchValidationMiddleware } from "@/entrypoint/factories/middlewares";

export default (router: Router): void => {
    const auth = adaptMiddleware(makeAuthMiddleware());
    const errorHandler = adaptErrorMiddleware(makeErrorMiddleware());
    const createMatchController = adaptRoute(makeCreateMatchController());
    const joinMatchController = adaptRoute(makeJoinMatchController());
    const joinMatchValidation = adaptMiddleware(makeJoinMatchValidationMiddleware());
    const playMatchController = adaptRoute(makePlayMatchController());
    const playMatchValidation = adaptMiddleware(makePlayMatchValidationMiddleware());
    
    router.post('/match', auth, createMatchController, errorHandler);
    router.post('/match/:code/join', auth, joinMatchValidation, joinMatchController, errorHandler);
    router.post('/match/:code/play', auth, playMatchValidation, playMatchController, errorHandler);
}