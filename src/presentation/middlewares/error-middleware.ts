import { BoardPositionUsedError, MatchFullError, MatchUnavailableError, PlayerInMatchError, PlayerMoveNotAllowedError, PlayerNotInMatchError } from "@/domain/errors";
import { EmailInUseError, EmailUnregisteredError, MatchNotFoundError, PasswordInvalidError, ServerError } from "@/application/errors";
import { conflict, createErrorResponse, forbidden, notFound, serverError, unauthorized } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";
import { Logger } from "@/application/protocols/logging";
import { ErrorResponse } from "@/presentation/contracts";

export class ErrorMiddleware implements Middleware {
    constructor(
        private readonly logger: Logger
    ) {}

    public async handle(data: any): Promise<HttpResponse<ErrorResponse>> {
        if (data instanceof Error) {
            return this.handleErrors(data);
        }

        return this.handleErrors(new ServerError());
    }

    private handleErrors(error: Error): HttpResponse<ErrorResponse> {
        const errorResponse = createErrorResponse(error);
        switch(true) {
            case error instanceof EmailInUseError:
            case error instanceof PlayerMoveNotAllowedError:
                return forbidden(errorResponse);
            case error instanceof EmailUnregisteredError:
            case error instanceof PasswordInvalidError:
                return unauthorized(errorResponse);
            case error instanceof MatchNotFoundError:
            case error instanceof PlayerNotInMatchError:
                return notFound(errorResponse);
            case error instanceof MatchUnavailableError:
            case error instanceof MatchFullError:
            case error instanceof PlayerInMatchError:
            case error instanceof BoardPositionUsedError:
                return conflict(errorResponse);
            default:
                this.logger.error(error);
                return serverError(errorResponse);
        }
    }
}