import { jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, LoginRequestSchema, LoginResponseSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('LoginRequest', LoginRequestSchema);
    registry.register('LoginResponse', LoginResponseSchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/login',
        tags: ['Authentication'],
        request: {
            body: jsonContent(LoginRequestSchema)
        },
        responses: {
            200: jsonContent(LoginResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            500: errorResponseContent
        }
    });
}