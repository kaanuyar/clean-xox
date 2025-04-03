import { buildErrorHandler, buildLoginValidation, buildRegisterValidation } from '@/entrypoint/factories/middlewares';
import { buildLoginController, buildRegisterController } from '@/entrypoint/factories/controllers'
import { Router } from 'express'

export const setupAuthRoutes = (router: Router): void => {
    const errorHandler = buildErrorHandler();

    router.post('/register', buildRegisterValidation(), buildRegisterController(), errorHandler);
    router.post('/login', buildLoginValidation(), buildLoginController(), errorHandler);
}