import { Controller, HttpResponse } from "@/presentation/protocols";
import { createErrorResponse, forbidden, serverError, unauthorized } from "@/presentation/helpers";
import { EmailInUseError, EmailUnregisteredError, PasswordInvalidError } from "@/application/errors";
import { ServerError } from "@/presentation/errors";

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
            return this.handleErrors(new ServerError());
        }
    }

    handleErrors(error: Error): HttpResponse {
        const errorResponse = createErrorResponse(error);
        switch(true) {
            case error instanceof EmailInUseError:
                return forbidden(errorResponse);
            case error instanceof EmailUnregisteredError:
            case error instanceof PasswordInvalidError:
                return unauthorized(errorResponse);
            default:
                return serverError(errorResponse);
        }
    }
}