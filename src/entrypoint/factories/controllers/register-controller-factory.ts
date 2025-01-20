import { RegisterController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols';
import { makeRegisterUsecase } from '@/entrypoint/factories/usecases';

export const makeRegisterController = (): Controller => {
    return new RegisterController(makeRegisterUsecase());
}