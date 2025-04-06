import { Controller, HttpResponse } from '@/presentation/protocols';
import { LoginUsecase } from '@/application/usecases';
import { LoginRequest, LoginResponse } from '@/presentation/contracts';
import { ok } from '@/presentation/helpers';

export class LoginController implements Controller {
    constructor(
        private readonly loginUsecase: LoginUsecase
    ) {}

    public async handle(request: LoginController.Params): Promise<HttpResponse<LoginController.Result>> {
        const { email, password } = request;
        const auth = await this.loginUsecase.login({
            email,
            password
        });
        
        return ok(auth);
    }
}

export namespace LoginController {
    export type Params = LoginRequest;
    export type Result = LoginResponse;
}