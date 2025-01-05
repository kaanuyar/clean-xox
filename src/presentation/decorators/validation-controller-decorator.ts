import { Controller, HttpResponse, Validation } from '@/presentation/protocols';
import { badRequest } from '@/presentation/helpers';

export class ValidationControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly validation: Validation
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const result = this.validation.validate(request);
        if (!result.isSuccess) {
            return badRequest(result.errors);
        }
        
        return this.controller.handle(request);
    }
}