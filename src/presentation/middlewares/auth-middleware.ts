import { TokenExpiredError, TokenInvalidError } from "@/src/application/errors";
import { ValidateTokenUsecase } from "@/src/application/usecases";
import { createErrorResponse, ok, unauthorized } from "@/src/presentation/helpers";
import { HttpResponse, Middleware } from "@/src/presentation/abstractions";
import { ErrorResponse } from "@/src/presentation/contracts";
import { ContextModel } from "@/src/application/models";

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly validateTokenUsecase: ValidateTokenUsecase
    ) {}

    public async handle(data: any): Promise<HttpResponse<ContextModel | ErrorResponse>> {
        const { accessToken }: { accessToken: string } = data;
        try {
            const response = this.validateTokenUsecase.validate(accessToken);
            return ok(response);
        } catch (error) {
            if (error instanceof TokenInvalidError || error instanceof TokenExpiredError) {
                return unauthorized(createErrorResponse(error));
            }
            throw error;
        }
    }
}