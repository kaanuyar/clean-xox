import { TokenExpiredError, TokenInvalidError } from "@/application/errors";
import { ValidateTokenUsecase } from "@/application/usecases";
import { createErrorResponse, ok, unauthorized } from "@/presentation/helpers";
import { HttpResponse } from "@/presentation/protocols";
import { Middleware } from "@/presentation/protocols/middleware";

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly validateTokenUsecase: ValidateTokenUsecase
    ) {}

    async handle(data: any): Promise<HttpResponse> {
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