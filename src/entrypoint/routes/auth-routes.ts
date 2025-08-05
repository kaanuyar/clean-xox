import { buildErrorHandler, buildLoginValidation, buildRegisterValidation } from '@/src/entrypoint/factories/middlewares';
import { buildLoginController, buildRegisterController } from '@/src/entrypoint/factories/controllers'
import { Router } from 'express'

export const setupAuthRoutes = (router: Router): void => {
    const errorHandler = buildErrorHandler();

    router.post('/register', buildRegisterValidation(), buildRegisterController(), errorHandler);
    router.post('/login', buildLoginValidation(), buildLoginController(), errorHandler);
}