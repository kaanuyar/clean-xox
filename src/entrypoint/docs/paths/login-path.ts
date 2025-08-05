import { errorResponseSchema, loginRequestSchema, loginResponseSchema } from "@/src/presentation/contracts";
import { jsonContent } from "@/src/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makeLoginPath = (registry: OpenAPIRegistry): void => {
    registry.register('LoginRequest', loginRequestSchema);
    registry.register('LoginResponse', loginResponseSchema);
    const errorResponseContent = jsonContent(errorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/login',
        tags: ['Authentication'],
        request: {
            body: jsonContent(loginRequestSchema)
        },
        responses: {
            200: jsonContent(loginResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            500: errorResponseContent
        }
    });
}