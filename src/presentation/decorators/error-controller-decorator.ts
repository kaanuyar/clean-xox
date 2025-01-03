import { Controller, HttpResponse } from "@/presentation/protocols";
import { forbidden, serverError, unauthorized } from "@/presentation/helpers";
import { EmailInUseError, EmailUnregisteredError, PasswordInvalidError } from "@/application/errors";

export class ErrorControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        try {
            return await this.controller.handle(request);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return this.handleErrors(error);
            }
            return serverError();
        }
    }

    handleErrors(error: Error): HttpResponse {
        switch(true) {
            case error instanceof EmailInUseError:
                return forbidden(error);
            case error instanceof EmailUnregisteredError:
            case error instanceof PasswordInvalidError:
                return unauthorized(error);
            default:
                return serverError();
        }
    }
}