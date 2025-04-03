import { errorResponseSchema, registerRequestSchema, registerResponseSchema } from "@/presentation/contracts";
import { jsonContent } from "@/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makeRegisterPath = (registry: OpenAPIRegistry): void => {
    registry.register('RegisterRequest', registerRequestSchema);
    registry.register('RegisterResponse', registerResponseSchema);
    const errorResponseContent = jsonContent(errorResponseSchema);
    
    registry.registerPath({
        method: 'post',
        path: '/register',
        tags: ['Authentication'],
        request: {
            body: jsonContent(registerRequestSchema)
        },
        responses: {
            200: jsonContent(registerResponseSchema),
            400: errorResponseContent,
            403: errorResponseContent,
            500: errorResponseContent
        }
    });
}