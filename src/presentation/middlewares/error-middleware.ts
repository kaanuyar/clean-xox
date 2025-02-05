import { EmailInUseError, EmailUnregisteredError, PasswordInvalidError, ServerError } from "@/application/errors";
import { createErrorResponse, forbidden, serverError, unauthorized } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";

export class ErrorMiddleware implements Middleware {

    async handle(data: any): Promise<HttpResponse> {
        if (data instanceof Error) {
            return this.handleErrors(data);
        }

        return this.handleErrors(new ServerError());
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