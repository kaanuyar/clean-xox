import { Router } from 'express'
import { adaptErrorMiddleware, adaptMiddleware, adaptRoute } from '@/entrypoint/adapters'
import { makeLoginController, makeRegisterController } from '@/entrypoint/factories/controllers'
import { makeErrorMiddleware, makeLoginValidationMiddleware, makeRegisterValidationMiddleware } from '@/entrypoint/factories/middlewares';

export default (router: Router): void => {
    const errorHandler = adaptErrorMiddleware(makeErrorMiddleware());
    
    const registerController = adaptRoute(makeRegisterController());
    const loginController = adaptRoute(makeLoginController());

    const registerValidation = adaptMiddleware(makeRegisterValidationMiddleware());
    const loginValidation = adaptMiddleware(makeLoginValidationMiddleware());

    router.post('/register', registerValidation, registerController, errorHandler);
    router.post('/login', loginValidation, loginController, errorHandler);
}