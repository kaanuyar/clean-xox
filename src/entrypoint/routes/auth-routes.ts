import { Router } from 'express'
import { adaptErrorMiddleware, adaptMiddleware, adaptRoute } from '@/entrypoint/adapters'
import { makeLoginController, makeRegisterController } from '@/entrypoint/factories/controllers'
import { makeErrorMiddleware, makeLoginValidationMiddleware, makeRegisterValidationMiddleware } from '@/entrypoint/factories/middlewares';

export default (router: Router): void => {
    const registerValidation = adaptMiddleware(makeRegisterValidationMiddleware());
    const registerController = adaptRoute(makeRegisterController());
    const loginValidation = adaptMiddleware(makeLoginValidationMiddleware());
    const loginController = adaptRoute(makeLoginController());
    const errorHandler = adaptErrorMiddleware(makeErrorMiddleware());

    router.post('/register', registerValidation, registerController, errorHandler);
    router.post('/login', loginValidation, loginController, errorHandler);
}