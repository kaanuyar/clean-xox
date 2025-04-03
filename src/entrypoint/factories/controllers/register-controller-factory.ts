import { RegisterController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols';
import { makeRegisterUsecase } from '@/entrypoint/factories/usecases';
import { adaptRoute } from '@/entrypoint/adapters';

export const makeRegisterController = (): Controller => {
    return new RegisterController(makeRegisterUsecase());
}

export const buildRegisterController = () => {
    return adaptRoute(makeRegisterController());
}