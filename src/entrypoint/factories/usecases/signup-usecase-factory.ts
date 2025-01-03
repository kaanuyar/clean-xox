import { SignUpUsecase } from "@/application/usecases";
import { makeAddAccountUsecase, makeLoginUsecase } from "@/entrypoint/factories/usecases";

export const makeSignUpUsecase = (): SignUpUsecase => {
    return new SignUpUsecase(makeAddAccountUsecase(), makeLoginUsecase());
}