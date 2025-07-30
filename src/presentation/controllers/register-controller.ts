import { Controller, HttpResponse } from '@/presentation/abstractions'
import { RegisterUsecase } from '@/application/usecases';
import { RegisterRequest, RegisterResponse } from '@/presentation/contracts';
import { ok } from '@/presentation/helpers'

export class RegisterController implements Controller {
    constructor(
        private readonly registerUsecase: RegisterUsecase
    ) {}

    public async handle(request: RegisterController.Params): Promise<HttpResponse<RegisterController.Result>> {
        const { name, email, password } = request;
        const auth = await this.registerUsecase.register({
            name,
            email,
            password
        });

        return ok(auth);
    }
}

export namespace RegisterController {
    export type Params = RegisterRequest;
    export type Result = RegisterResponse;
}