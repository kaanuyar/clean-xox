import { EmailInUseError, EmailUnregisteredError, MatchNotFoundError, PasswordInvalidError, ServerError } from "@/application/errors";
import { MatchFullError, MatchUnavailableError, PlayerInMatchError } from "@/domain/errors";
import { conflict, createErrorResponse, forbidden, notFound, serverError, unauthorized } from "@/presentation/helpers";
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
            case error instanceof MatchNotFoundError:
                return notFound(errorResponse);
            case error instanceof MatchUnavailableError:
            case error instanceof MatchFullError:
            case error instanceof PlayerInMatchError:
                return conflict(errorResponse);
            default:
                return serverError(errorResponse);
        }
    }
}