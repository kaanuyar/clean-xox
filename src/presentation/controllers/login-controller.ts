import { Controller, HttpResponse } from '@/presentation/protocols';
import { ok } from '@/presentation/helpers';
import { LoginUsecase } from '@/application/usecases';

export class LoginController implements Controller {
    constructor(
        private readonly loginUsecase: LoginUsecase
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const { email, password } = request;
        const auth = await this.loginUsecase.login({
            email,
            password
        });
        
        return ok(auth);
    }
}