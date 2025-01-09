import { jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, RegisterRequestSchema, RegisterResponseSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('RegisterRequest', RegisterRequestSchema);
    registry.register('RegisterResponse', RegisterResponseSchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);
    
    registry.registerPath({
        method: 'post',
        path: '/register',
        tags: ['Authentication'],
        request: {
            body: jsonContent(RegisterRequestSchema)
        },
        responses: {
            200: jsonContent(RegisterResponseSchema),
            400: errorResponseContent,
            403: errorResponseContent,
            500: errorResponseContent
        }
    });
}