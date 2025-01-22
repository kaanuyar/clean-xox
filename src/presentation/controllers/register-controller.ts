import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'
import { RegisterUsecase } from '@/application/usecases';

export class RegisterController implements Controller {
    constructor(
        private readonly registerUsecase: RegisterUsecase
    ) {}

    async handle(request: RegisterController.Params): Promise<HttpResponse> {
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
    export type Params = {
        name: string,
        email: string,
        password: string
    };
}