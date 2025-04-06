import { HttpResponse, Validation, Middleware } from "@/presentation/protocols";
import { badRequest, ok } from "@/presentation/helpers";
import { ErrorResponse } from "@/presentation/contracts";

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