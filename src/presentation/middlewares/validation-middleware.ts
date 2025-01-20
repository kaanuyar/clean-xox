import { badRequest, ok } from "@/presentation/helpers";
import { HttpResponse, Validation } from "@/presentation/protocols";
import { Middleware } from "@/presentation/protocols/middleware";

export class ValidationMiddleware implements Middleware {
    constructor(
        private readonly validation: Validation
    ) {}

    async handle(data: any): Promise<HttpResponse> {
        const result = this.validation.validate(data);
        if (!result.isSuccess) {
            return badRequest(result.errors);
        }

        return ok({});
    }
}