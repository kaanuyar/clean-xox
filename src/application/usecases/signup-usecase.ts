import { EmailInUseError } from "@/application/errors";
import { AddAccountUsecase, LoginUsecase } from "@/application/usecases";

export class SignUpUsecase {
    constructor(
        private readonly addAccountUsecase: AddAccountUsecase,
        private readonly loginUsecase: LoginUsecase
    ) {}

    async signup(account: SignUpUsecase.Params): Promise<SignUpUsecase.Result> {
        await this.addAccountUsecase.add(account);
        return await this.loginUsecase.login({
            email: account.email,
            password: account.password
        });
    }
}

export namespace SignUpUsecase {
    export type Params = AddAccountUsecase.Params;
    export type Result = LoginUsecase.Result;
}