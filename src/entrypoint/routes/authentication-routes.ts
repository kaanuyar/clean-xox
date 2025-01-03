import { Router } from 'express'
import { adaptRoute } from '@/entrypoint/adapters'
import { makeLoginController, makeSignUpController } from '@/entrypoint/factories/controllers'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()));
    router.post('/login', adaptRoute(makeLoginController()));
}