import { buildAuthCheck, buildErrorHandler, buildGetMatchValidation, buildJoinMatchValidation, buildPlayMatchValidation } from "@/src/entrypoint/factories/middlewares";
import { buildCreateMatchController, buildGetMatchController, buildJoinMatchController, buildPlayMatchController } from "@/src/entrypoint/factories/controllers";
import { Router } from "express";

export const setupMatchRoutes = (router: Router): void => {
    const authCheck = buildAuthCheck();
    const errorHandler = buildErrorHandler();
    
    router.get('/match/:code', authCheck, buildGetMatchValidation(), buildGetMatchController(), errorHandler);

    router.post('/match', authCheck, buildCreateMatchController(), errorHandler);
    router.post('/match/:code/join', authCheck, buildJoinMatchValidation(), buildJoinMatchController(), errorHandler);
    router.post('/match/:code/play', authCheck, buildPlayMatchValidation(), buildPlayMatchController(), errorHandler);
}