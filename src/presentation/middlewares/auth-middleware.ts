import { TokenExpiredError, TokenInvalidError } from "@/application/errors";
import { ValidateTokenUsecase } from "@/application/usecases";
import { createErrorResponse, ok, unauthorized } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";
import { ErrorResponse } from "@/presentation/contracts";
import { ContextModel } from "@/application/models";

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