import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'
import { SignUpUsecase } from '@/application/usecases';

export class SignUpController implements Controller {

    constructor(
        private readonly signUpUsecase: SignUpUsecase
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const { name, email, password } = request;
        const auth = await this.signUpUsecase.signup({
            name,
            email,
            password
        });

        return ok(auth);
    }
}