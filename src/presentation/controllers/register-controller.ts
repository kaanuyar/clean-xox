import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'
import { RegisterUsecase } from '@/application/usecases';

export class RegisterController implements Controller {
    constructor(
        private readonly registerUsecase: RegisterUsecase
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const { name, email, password } = request;
        const auth = await this.registerUsecase.register({
            name,
            email,
            password
        });

        return ok(auth);
    }
}