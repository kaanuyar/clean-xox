import { HttpResponse, Validation, Middleware } from "@/src/presentation/abstractions";
import { badRequest, ok } from "@/src/presentation/helpers";
import { ErrorResponse } from "@/src/presentation/contracts";

export class ValidationMiddleware implements Middleware {
    constructor(
        private readonly validation: Validation
    ) {}

    public async handle(data: any): Promise<HttpResponse<Record<string, never> | ErrorResponse>> {
        const result = this.validation.validate(data);
        if (!result.isSuccess) {
            return badRequest(result.errors);
        }

        return ok({});
    }
}