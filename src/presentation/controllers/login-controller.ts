import { Controller, HttpResponse } from '@/src/presentation/abstractions';
import { LoginUsecase } from '@/src/application/usecases';
import { LoginRequest, LoginResponse } from '@/src/presentation/contracts';
import { ok } from '@/src/presentation/helpers';

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