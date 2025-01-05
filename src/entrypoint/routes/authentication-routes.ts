import { Router } from 'express'
import { adaptRoute } from '@/entrypoint/adapters'
import { makeLoginController, makeRegisterController } from '@/entrypoint/factories/controllers'

export default (router: Router): void => {
    router.post('/register', adaptRoute(makeRegisterController()));
    router.post('/login', adaptRoute(makeLoginController()));
}