import { RegisterController } from '@/src/presentation/controllers'
import { Controller } from '@/src/presentation/abstractions';
import { makeRegisterUsecase } from '@/src/entrypoint/factories/usecases';
import { adaptRoute } from '@/src/entrypoint/adapters';

export const makeRegisterController = (): Controller => {
    return new RegisterController(makeRegisterUsecase());
}

export const buildRegisterController = () => {
    return adaptRoute(makeRegisterController());
}