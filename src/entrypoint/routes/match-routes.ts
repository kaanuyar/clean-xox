import { Router } from "express";
import { adaptErrorMiddleware, adaptMiddleware, adaptRoute } from "@/entrypoint/adapters";
import { makeCreateMatchController, makeGetMatchController, makeJoinMatchController, makePlayMatchController } from "@/entrypoint/factories/controllers";
import { makeAuthMiddleware, makeErrorMiddleware, makeGetMatchValidationMiddleware, makeJoinMatchValidationMiddleware, makePlayMatchValidationMiddleware } from "@/entrypoint/factories/middlewares";

export default (router: Router): void => {
    const auth = adaptMiddleware(makeAuthMiddleware());
    const errorHandler = adaptErrorMiddleware(makeErrorMiddleware());
    
    const getMatchController = adaptRoute(makeGetMatchController());
    const createMatchController = adaptRoute(makeCreateMatchController());
    const joinMatchController = adaptRoute(makeJoinMatchController());
    const playMatchController = adaptRoute(makePlayMatchController());

    const getMatchValidation = adaptMiddleware(makeGetMatchValidationMiddleware());
    const joinMatchValidation = adaptMiddleware(makeJoinMatchValidationMiddleware());
    const playMatchValidation = adaptMiddleware(makePlayMatchValidationMiddleware());
    
    router.get('/match/:code', auth, getMatchValidation, getMatchController, errorHandler);

    router.post('/match', auth, createMatchController, errorHandler);
    router.post('/match/:code/join', auth, joinMatchValidation, joinMatchController, errorHandler);
    router.post('/match/:code/play', auth, playMatchValidation, playMatchController, errorHandler);
}